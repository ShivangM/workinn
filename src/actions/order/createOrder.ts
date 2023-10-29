'use server';
import { BuyerBrief, OrderStatus } from '@/interfaces/order.d';
import { Service } from '@/interfaces/service';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const createOrder = async (
  data: BuyerBrief,
  serviceId: string,
  sellerId: string
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

  await db.collection('orders').add({
    buyersBrief: data,
    buyerId: uid,
    serviceId: serviceId,
    sellerId: sellerId,
    status: OrderStatus.NEGOTIATION,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
  });
};

export default createOrder;
