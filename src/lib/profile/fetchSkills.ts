import { Skill } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';

const fetchSkills = async (
  token: string,
  userId?: string
): Promise<APIResponse<Skill[]>> => {
  const decodedToken = await auth.verifyIdToken(token);
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
