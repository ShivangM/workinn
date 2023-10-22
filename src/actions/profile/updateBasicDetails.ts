'use server';
import { BasicDetails } from '@/interfaces/user';
import { db, auth } from '@/utils/firebaseAdmin';
import { revalidateTag } from 'next/cache';

const updateBasicDetails = async (data: BasicDetails, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  await db
    .collection('users')
    .doc(uid)
    .update({
      ...data,
    });

  revalidateTag('basic-details');
};

export default updateBasicDetails;
