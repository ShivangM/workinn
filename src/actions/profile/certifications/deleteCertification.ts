'use server';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';

const deleteCertification = async (id: string, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .collection('certifications')
    .doc(id)
    .delete();

  revalidatePath('/profile')
};

export default deleteCertification;
