import { UserData } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';

const fetchUserData = async (
  token: string | undefined,
  userId?: string
): Promise<APIResponse<UserData>> => {
  try {
    if (!token) {
      throw new Error('Invalid token');
    }

    const decodedToken = await auth.verifyIdToken(token);
    const uid = userId || decodedToken.uid;

    const userRef = db.collection('users').doc(uid);
    const userSnapshot = await userRef.get();
    const user = userSnapshot.data() as UserData;

    return {
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

export default fetchUserData;
