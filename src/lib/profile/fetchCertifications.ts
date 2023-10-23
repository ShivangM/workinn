import { Certification } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';

const fetchCertifications = async (
  token: string,
  userId?: string
): Promise<APIResponse<Certification[]>> => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = userId || decodedToken.uid;

  const certificationsRef = db
    .collection('users')
    .doc(uid)
    .collection('certifications');

  const certificationsSnapshot = await certificationsRef.get();
  const certifications = certificationsSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as Certification[];

  return {
    data: certifications,
  };
};

export default fetchCertifications;
