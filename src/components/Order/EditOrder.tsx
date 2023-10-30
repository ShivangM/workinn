'use client';
import { Order } from '@/interfaces/order.d';
import { auth } from '@/utils/firebase';
import React from 'react';
import BuyerEdit from './BuyerEdit';
import SellerEdit from './SellerEdit';

type Props = {
  order: Order;
};

const EditOrder = ({ order }: Props) => {
  const { id, buyerId } = order;
  const userId = auth.currentUser?.uid;

  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold capitalize">
        Edit Order #{id}
      </h3>

      {userId === buyerId ? (
        <BuyerEdit order={order} />
      ) : (
        <SellerEdit order={order} />
      )}
    </div>
  );
};

export default EditOrder;
