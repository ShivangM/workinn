import { APIResponse } from '@/interfaces/typing';
import { Education } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const fetchEducation = async (
  userId?: string
): Promise<APIResponse<Education[]>> => {
  const token = cookies().get('token')

  if (!token) {
    throw new Error('Unauthorized')
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = userId || decodedToken.uid;

  const educationRef = db.collection('users').doc(uid).collection('education').orderBy('createdAt', 'desc');

  const educationSnapshot = await educationRef.get();
  const education = educationSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as Education[];

  return {
    data: education,
  };
};

export default fetchEducation;
