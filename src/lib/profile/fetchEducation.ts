import { Education } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';

const fetchEducation = async (
  token: string,
  userId?: string
): Promise<APIResponse<Education[]>> => {
  const decodedToken = await auth.verifyIdToken(token);
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
