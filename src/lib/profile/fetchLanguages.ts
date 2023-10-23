import { Language } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';

const fetchLanguages = async (
  token: string,
  userId?: string
): Promise<APIResponse<Language[]>> => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = userId || decodedToken.uid;

  const languagesRef = db.collection('users').doc(uid).collection('languages');

  const languagesSnapshot = await languagesRef.get();
  const languages = languagesSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as Language[];

  return {
    data: languages,
  };
};

export default fetchLanguages;
