import { db, auth } from '@/utils/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

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
  const uid = decodedToken.uid;

  const educationRef = db.collection('users').doc(uid).collection('education');

  const educationSnapshot = await educationRef.get();
  const education = educationSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return NextResponse.json(
    { data: education },
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
