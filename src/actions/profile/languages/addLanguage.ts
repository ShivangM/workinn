'use server';
import { Language } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const addLanguage = async (data: Language, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db.collection('users').doc(uid).collection('languages').add(data);

  revalidateTag('languages');
};

export default addLanguage;
