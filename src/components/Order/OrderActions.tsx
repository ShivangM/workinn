import { Order } from '@/interfaces/order';
import fetchUserData from '@/lib/profile/fetchUserData';
import React from 'react';

type Props = {
  order: Order;
};

const OrderActions = async ({ order }: Props) => {
  const { data: seller } = await fetchUserData(order.sellerId);
  const { data: buyer } = await fetchUserData(order.buyerId);

  return <div>OrderActions</div>;
};

export default OrderActions;
