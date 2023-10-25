'use server';
import { Language } from '@/interfaces/user';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const updateLanguage = async (id: string, data: Language) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('languages')
    .doc(id)
    .update({ ...data, updatedAt: admin.firestore.Timestamp.now() });

  revalidatePath('/profile')
};

export default updateLanguage;
