import { APIResponse } from '@/interfaces/typing';
import { UserData } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const fetchUserData = async (
  userId?: string
): Promise<APIResponse<UserData | null>> => {
  const token = cookies().get('token');

  let uid = null;

  if (token) {
    const decodedToken = await auth.verifyIdToken(token.value);
    uid = decodedToken.uid;
  } else {
    uid = userId;
  }

  if (!uid) {
    return {
      data: null,
    };
  }

  const userRef = db.collection('users').doc(uid);
  const userSnapshot = await userRef.get();
  const user = userSnapshot.data() as UserData;

  return {
    data: user,
  };
};

export default fetchUserData;
