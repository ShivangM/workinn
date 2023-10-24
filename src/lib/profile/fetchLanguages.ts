import { Language } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';

const fetchLanguages = async (
  token: string,
  userId?: string
): Promise<APIResponse<Language[]>> => {
  const decodedToken = await auth.verifyIdToken(token);
  const uid = userId || decodedToken.uid;

  const languagesRef = db.collection('users').doc(uid).collection('languages').orderBy('createdAt', 'desc');

  const languagesSnapshot = await languagesRef.get();
  const languages = await Promise.all(
    languagesSnapshot.docs.map(async (doc) => {
      const level = doc.data().level;
      const languageRef = db.collection('languages').doc(doc.id);
      const languageDoc = await languageRef.get();
      return { ...languageDoc.data(), id: languageDoc.id, level } as Language;
    })
  );

  return {
    data: languages,
  };
};

export default fetchLanguages;
