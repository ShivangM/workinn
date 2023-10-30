'use client';
import useOrder from '@/hooks/useOrder';
import { Order } from '@/interfaces/order.d';
import { auth } from '@/utils/firebase';
import React, { useEffect, useState } from 'react';
import BuyerEdit from './BuyerEdit';
import SellerEdit from './SellerEdit';

type Props = {
  order: Order;
};

const EditOrder = ({ order }: Props) => {
  const { id } = order;
  const { isBuyer, loading } = useOrder({ order });

  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold capitalize">
        Edit Order #{id}
      </h3>

      {!loading ? (
        isBuyer ? (
          <BuyerEdit order={order} />
        ) : (
          <SellerEdit order={order} />
        )
      ) : (
        <p className="text-gray-600 animate-pulse">Loading ...</p>
      )}
    </div>
  );
};

export default EditOrder;
