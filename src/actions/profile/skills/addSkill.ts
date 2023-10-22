'use server';
import { Skill } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const addSkill = async (data: Skill, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db.collection('users').doc(uid).collection('skills').add(data);

  revalidateTag('skiils');
};

export default addSkill;
