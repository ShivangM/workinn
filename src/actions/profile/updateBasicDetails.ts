'use server';
import { BasicDetails } from '@/interfaces/user';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const updateBasicDetails = async (data: BasicDetails) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .update({
      ...data,
      updatedAt: admin.firestore.Timestamp.now(),
    });

  revalidateTag('user-data');
};

export default updateBasicDetails;
