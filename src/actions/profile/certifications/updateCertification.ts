'use server';
import { Certification } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const updateCertification = async (
  id: string,
  data: Certification,
  token: string
) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('certifications')
    .doc(id)
    .update({ ...data });

  revalidateTag('certifications');
};

export default updateCertification;
