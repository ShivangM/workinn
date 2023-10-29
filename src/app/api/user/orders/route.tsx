import { Order } from '@/interfaces/order';
import { auth, db } from '@/utils/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<
  NextResponse<{
    orders?: Order[];
    error?: string;
  }>
> {
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  const userOrdersRef = db.collection('orders').where('buyerId', '==', uid);
  const userOrders = await userOrdersRef.get();

  const orders = userOrders.docs.map((order) => ({
    id: order.id,
    ...order.data(),
  })) as Order[];

  return NextResponse.json(
    { orders },
    {
      status: 200,
      statusText: 'OK',
    }
  );
}
