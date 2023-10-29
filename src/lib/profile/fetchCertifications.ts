import { APIResponse } from '@/interfaces/typing';
import { Certification } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const fetchCertifications = async (
  userId?: string
): Promise<APIResponse<Certification[]>> => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = userId || decodedToken.uid;

  const certificationsRef = db
    .collection('users')
    .doc(uid)
    .collection('certifications')
    .orderBy('createdAt', 'desc');

  const certificationsSnapshot = await certificationsRef.get();
  const certifications = certificationsSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as Certification[];

  return {
    data: certifications,
  };
};

export default fetchCertifications;
