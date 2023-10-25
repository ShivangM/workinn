import { APIResponse } from '@/interfaces/typing';
import { UserData } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const fetchUserData = async (
  userId?: string
): Promise<APIResponse<UserData>> => {
  const token = cookies().get('token')

  if (!token) {
    throw new Error('Unauthorized')
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = userId || decodedToken.uid;

  const userRef = db.collection('users').doc(uid);
  const userSnapshot = await userRef.get();
  const user = userSnapshot.data() as UserData;

  return {
    data: user,
  };
};

export default fetchUserData;
