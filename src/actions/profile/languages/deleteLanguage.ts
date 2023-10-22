'use server';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const deleteLanguage = async (id: string, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('languages')
    .doc(id)
    .delete();

  revalidateTag('languages');
};

export default deleteLanguage;
