'use server';
import { Service, ServiceInput } from '@/interfaces/service';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const updateService = async (id: string, updatedService: ServiceInput) => {
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
      ...updatedService,
      updatedAt: admin.firestore.Timestamp.now(),
    });
  }

  revalidateTag('user-services');
};

export default updateService;
