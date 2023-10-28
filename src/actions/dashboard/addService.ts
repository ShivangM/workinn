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

  const serviceCollectionRef = db.collection('services');

  const serviceDoc = await serviceCollectionRef.add({
    ...service,
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

  revalidateTag('user-services');
  return serviceId;
};

export default addService;
