'use server';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const deleteEducation = async (id: string, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('education')
    .doc(id)
    .delete();

  revalidateTag('education');
};

export default deleteEducation;
