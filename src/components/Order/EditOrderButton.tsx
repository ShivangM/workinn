import { Order } from '@/interfaces/order';
import useOrderStore from '@/store/orderStore';
import React from 'react';

type Props = {
  order: Order;
};

const EditOrderButton = ({ order }: Props) => {
  const [editOrder, toggleEditOrder] = useOrderStore((state) => [
    state.editOrder,
    state.toggleEditOrder,
  ]);
  return (
    <button
      onClick={toggleEditOrder}
      className="px-5 py-2.5 w-full font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
    >
      {editOrder ? 'View Order' : 'Edit Order'}
    </button>
  );
};

export default EditOrderButton;
