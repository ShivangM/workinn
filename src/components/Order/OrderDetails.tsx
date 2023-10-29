import { Order } from '@/interfaces/order';
import React from 'react';

type Props = {
  order: Order;
};

const OrderDetails = ({ order }: Props) => {
  const { id } = order;

  return (
    <div className="bg-white rounded-xl p-8 h-full w-full">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold capitalize">
        Order #{id}
      </h3>
    </div>
  );
};

export default OrderDetails;
