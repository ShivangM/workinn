'use server';
import { Skill } from '@/interfaces/user';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';

const updateSkill = async (id: string, data: Skill, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
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
