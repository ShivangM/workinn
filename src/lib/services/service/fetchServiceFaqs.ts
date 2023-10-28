import { APIResponse, FAQ } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const fetchServiceFaqs = async (serviceId: string): Promise<APIResponse<FAQ[]>> => {
    const serviceFaqsRef = db.collection('services').doc(serviceId).collection('faqs');
    const serviceFaqsSnapshot = await serviceFaqsRef.get();
    const serviceFaqs = serviceFaqsSnapshot.docs.map((doc) => {
        const serviceFaq = {
            id: doc.id,
            ...doc.data(),
        }
        return serviceFaq as FAQ;
    });

    return { data: serviceFaqs };
};

export default fetchServiceFaqs;
