'use server';
import { Education } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const addEducation = async (data: Education, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db.collection('users').doc(uid).collection('education').add(data);

  revalidateTag('education');
};

export default addEducation;
