'use server';
import { Skill } from '@/interfaces/user';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const updateSkill = async (id: string, data: Skill) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('skills')
    .doc(id)
    .update({ ...data, updatedAt: admin.firestore.Timestamp.now() });

  revalidatePath('/profile')
};

export default updateSkill;
