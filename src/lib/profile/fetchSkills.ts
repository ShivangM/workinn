import { APIResponse } from '@/interfaces/typing';
import { Skill } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const fetchSkills = async (
  userId?: string
): Promise<APIResponse<Skill[]>> => {
  const token = cookies().get('token')

  if (!token) {
    throw new Error('Unauthorized')
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = userId || decodedToken.uid;

  const skillsRef = db.collection('users').doc(uid).collection('skills').orderBy('createdAt', 'desc');

  const skillsSnapshot = await skillsRef.get();
  const skills = skillsSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as Skill[];

  return {
    data: skills,
  };
};

export default fetchSkills;
