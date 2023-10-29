import { Order, OrderStatus } from '@/interfaces/order.d';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GiCancel, GiReceiveMoney } from 'react-icons/gi';
import { MdOpenInNew } from 'react-icons/md';
import { SiProgress } from 'react-icons/si';
import { GrDeliver } from 'react-icons/gr';
import useUiStore from '@/store/uiStore';
import { UserData, UserModes } from '@/interfaces/user';
import fetchUserData from '@/lib/profile/fetchUserData';

type Props = {
  order: Order;
};

const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.NEGOTIATION:
      return <GiReceiveMoney className="w-7 h-7 text-gray-500  mb-3" />;
    case OrderStatus.IN_PROGRESS:
      return <SiProgress className="w-7 h-7 text-yellow-500  mb-3" />;
    case OrderStatus.COMPLETED:
      return <GrDeliver className="w-7 h-7 text-green-500  mb-3" />;
    case OrderStatus.CANCELLED:
      return <GiCancel className="w-7 h-7 text-red-500  mb-3" />;
    default:
      return null;
  }
};

const OrderCard = ({ order }: Props) => {
  const { id, status, buyerId, sellerId, buyersBrief } = order;
  const userMode = useUiStore((state) => state.userMode);
  const [orderWith, setOrderWith] = useState<UserData | null>();

  const { projectBudget, projectDeadline, projectTitle } = buyersBrief;

  //   useEffect(() => {
  //     const fetchOrderWith = async (userId: string) => {
  //       const { data } = await fetchUserData(userId);
  //       setOrderWith(data);
  //     };

  //     if (userMode === UserModes.BUYER) {
  //       fetchOrderWith(sellerId);
  //     } else {
  //       fetchOrderWith(buyerId);
  //     }
  //   }, [userMode, buyerId, sellerId]);

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
      <OrderStatusIcon status={status} />
      <Link
        href={`/order/${id}`}
        rel="noreffer"
        target="_blank"
        className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 hover:underline"
      >
        Order #{id}
      </Link>

      <p className="mb-3 font-normal text-gray-500">{projectTitle}</p>
      <p className="mb-3 font-normal text-gray-500">{projectBudget}</p>
      <p className="mb-3 font-normal text-gray-500">{projectDeadline}</p>

      {/* <div className="flex items-center mb-3 space-x-2">
        <p className="font-semibold">
          {userMode === UserModes.BUYER ? 'Seller' : 'Buyer'}:
        </p>
        <p className="font-normal text-gray-500">{orderWith?.displayName}</p>
      </div> */}
    </div>
  );
};

export default OrderCard;
