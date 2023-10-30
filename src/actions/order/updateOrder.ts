'use server';
import { Order } from '@/interfaces/order';
import admin, { db, auth } from '@/utils/firebaseAdmin';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const updateOrder = async (orderId: string, updateData: Order) => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();
  const data = order.data() as Order;

  if (data.buyerId !== uid && data.sellerId !== uid) {
    throw new Error('Unauthorized');
  }

  await orderRef.update({
    ...updateData,
    updatedAt: admin.firestore.Timestamp.now(),
  });

  revalidatePath('/order/' + orderId);
};

export default updateOrder;
