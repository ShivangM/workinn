'use server';
import { BasicDetails } from '@/interfaces/user';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';

const updateBasicDetails = async (data: BasicDetails, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .update({
      ...data,
      updatedAt: admin.firestore.Timestamp.now(),
    });

  revalidatePath('/profile');
};

export default updateBasicDetails;
