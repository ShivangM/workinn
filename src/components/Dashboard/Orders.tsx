import { Order } from '@/interfaces/order';
import fetchOrders from '@/lib/orders/fetchOrders';
import useUiStore from '@/store/uiStore';
import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';

type Props = {};

const Orders = (props: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userMode] = useUiStore((state) => [state.userMode]);

  useEffect(() => {
    const fetchOrdersHandler = async () => {
      const { data } = await fetchOrders(userMode);
      setOrders(data);
    };

    fetchOrdersHandler();
  }, [userMode]);

  return (
    <div className="flex flex-col w-full py-4 space-y-4">
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
};

export default Orders;
