'use server';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const deleteSkill = async (id: string) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  await db.collection('users').doc(uid).collection('skills').doc(id).delete();

  revalidatePath('/profile')
};

export default deleteSkill;
