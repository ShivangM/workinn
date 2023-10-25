import { Service } from '@/interfaces/service';
import { db } from '@/utils/firebaseAdmin';

const fetchService = async (serviceId: string): Promise<APIResponse<Service>> => {
    const serviceRef = db.collection('services').doc(serviceId);
    const serviceSnapshot = await serviceRef.get();
    const service = serviceSnapshot.data() as Service;

    return { data: service };
};

export default fetchService;
