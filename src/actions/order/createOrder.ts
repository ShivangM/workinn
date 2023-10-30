'use server';
import { BuyerBrief, Order, OrderStatus } from '@/interfaces/order.d';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const createOrder = async (
  data: BuyerBrief,
  sellerId: string,
  serviceId: string
) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  let uid = null;

  try {
    const decodedToken = await auth.verifyIdToken(token.value);
    uid = decodedToken.uid;
  } catch (error) {
    NextResponse.redirect('/signin');
  }

  const order = await db.collection('orders').add({
    buyersBrief: data,
    buyerId: uid,
    sellerId,
    serviceId,
    status: OrderStatus.NEGOTIATION,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
  });

  const orderId = order.id;
  return orderId;
};

export default createOrder;
