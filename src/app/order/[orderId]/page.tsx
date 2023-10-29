import OrderActions from '@/components/Order/OrderActions';
import OrderDetails from '@/components/Order/OrderDetails';
import fetchOrder from '@/lib/orders/fetchOrder';
import React from 'react';

type Props = {
  params: {
    orderId: string;
  };
};

const page = async ({ params: { orderId } }: Props) => {
  const { data } = await fetchOrder(orderId);
  return (
    <div className="flex min-h-screen space-x-8">
      {/* @ts-ignore */}
      <OrderActions order={data} />
      {/* @ts-ignore */}
      <OrderDetails order={data} />
    </div>
  );
};

export default page;
