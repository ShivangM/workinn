'use server';
import { Skill } from '@/interfaces/user';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const addSkill = async (data: Skill) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  await db.collection('users').doc(uid).collection('skills').add({
    ...data,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
  });

  revalidatePath('/profile')
};

export default addSkill;
