import { Order } from '@/interfaces/order';
import { APIResponse } from '@/interfaces/typing';
import { auth, db } from '@/utils/firebaseAdmin';
import { cookies } from 'next/headers';

const fetchOrder = async (orderId: string): Promise<APIResponse<Order>> => {
  const token = cookies().get('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = await auth.verifyIdToken(token.value);
  const uid = decodedToken.uid;

  const orderRef = db.collection('orders').doc(orderId);
  const orderSnapshot = await orderRef.get();
  const orderData = orderSnapshot.data() as Order;
  orderData.id = orderSnapshot.id;

  if (orderData.buyerId !== uid && orderData.sellerId !== uid) {
    throw new Error('Unauthorized');
  }

  return { data: orderData };
};

export default fetchOrder;
