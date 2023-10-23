import { db, auth } from '@/utils/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }

  const decodedToken = await auth.verifyIdToken(token);
  const uid = userId || decodedToken.uid;

  const certificationsRef = db
    .collection('users')
    .doc(uid)
    .collection('certifications');

  const certificationsSnapshot = await certificationsRef.get();
  const certifications = certificationsSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return NextResponse.json(
    { data: certifications },
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
