'use server';
import { ServiceInput } from '@/interfaces/service';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const addService = async (service: ServiceInput) => {
    const token = cookies().get('token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const decodedToken = await auth.verifyIdToken(token.value);
    const uid = decodedToken.uid;

    const serviceCollectionRef = db.collection('services')

    const faqs = service.faqs;
    delete service.faqs

    const serviceDoc = await serviceCollectionRef.add({
        ...service,
        images: [],
        ownerId: uid,
        rating: {
            overall: 0,
            total: 0,
        },
        isPaused: false,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
    });

    const serviceId = serviceDoc.id;
    const faqsCollectionRef = serviceCollectionRef.doc(serviceId).collection('faqs');

    if (faqs) {
        faqs.forEach(async (faq) => {
            await faqsCollectionRef.add(faq);
        });
    }

    revalidateTag('user-services')
    return serviceId;
};

export default addService;
