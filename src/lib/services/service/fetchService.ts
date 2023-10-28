import { Service } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const fetchService = async (
  serviceId: string
): Promise<APIResponse<Service>> => {
  const serviceRef = db.collection('services').doc(serviceId);
  const serviceSnapshot = await serviceRef.get();
  const service = {
    id: serviceSnapshot.id,
    ...serviceSnapshot.data(),
  } as Service;

  return { data: service };
};

export default fetchService;
