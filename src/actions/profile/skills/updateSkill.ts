'use server';
import { Skill } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const updateSkill = async (id: string, data: Skill, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('skills')
    .doc(id)
    .update({ ...data });

  revalidateTag('skills');
};

export default updateSkill;
