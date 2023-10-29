import { UserData } from '@/interfaces/user';
import { auth, db } from '@/utils/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<
  NextResponse<{
    user?: UserData;
    error?: string;
  }>
> {
  const token = request.cookies.get('token');
  const searchParams = request.nextUrl.searchParams;
  let userId = null;
  const userIdParam = searchParams.get('userId');

  if (userIdParam) {
    userId = userIdParam;
  } else {
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        {
          status: 400,
          statusText: 'Bad Request',
        }
      );
    }
    const decodedToken = await auth.verifyIdToken(token.value);
    userId = decodedToken.uid;
  }

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }

  const userRef = db.collection('users').doc(userId);
  const userSnapshot = await userRef.get();
  const user = userSnapshot.data() as UserData;

  return NextResponse.json(
    { user },
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
