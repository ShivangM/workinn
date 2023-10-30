'use server';
import { Order, OrderStatus } from '@/interfaces/order.d';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const cancelOrder = async (orderId: string) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();
  const data = order.data() as Order;

  if (data.buyerId !== uid || data.sellerId !== uid) {
    throw new Error('Unauthorized');
  }

  await orderRef.update({
    status: OrderStatus.CANCELLED,
    cancelledAt: admin.firestore.Timestamp.now(),
  });
};

export default cancelOrder;
