'use server';
import { Service } from '@/interfaces/service';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const toggelServiceStatus = async (id: string) => {
    const token = cookies().get('token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const decodedToken = await auth.verifyIdToken(token.value);
    const uid = decodedToken.uid;

    const serviceRef = db.collection('services').doc(id);
    const service = await serviceRef.get();
    const serviceData = service.data() as Service;

    if (serviceData.ownerId !== uid) {
        throw new Error('Unauthorized');
    } else {
        await serviceRef.update({
            isPaused: !serviceData.isPaused,
        });
    }

    revalidateTag('user-services')
};

export default toggelServiceStatus;
