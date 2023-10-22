'use server';
import { Language } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const updateLanguage = async (id: string, data: Language, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('langueages')
    .doc(id)
    .update({ ...data });

  revalidateTag('langueages');
};

export default updateLanguage;
