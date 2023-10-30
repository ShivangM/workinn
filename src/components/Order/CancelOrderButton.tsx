'use client';
import { Order } from '@/interfaces/order.d';
import useOrderStore from '@/store/orderStore';
import React from 'react';

type Props = {
  order: Order;
};

const CancelOrderButton = ({ order }: Props) => {
  const toggelCancelOrderModal = useOrderStore(
    (state) => state.toggelCancelOrderModal
  );
  return (
    <button
      onClick={() => toggelCancelOrderModal(order)}
      className="inline-flex w-full items-center justify-center px-4 py-2 text-base font-medium leading-6 text-red-600 whitespace-no-wrap bg-white border border-red-200 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:shadow-none"
    >
      Cancel
    </button>
  );
};

export default CancelOrderButton;
