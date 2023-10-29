import { Order, OrderStatus } from '@/interfaces/order.d';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GiCancel, GiReceiveMoney } from 'react-icons/gi';
import { SiProgress } from 'react-icons/si';
import { GrDeliver } from 'react-icons/gr';
import { UserData } from '@/interfaces/user';
import { auth } from '@/utils/firebase';
import Image from 'next/image';

type Props = {
  order: Order;
};

const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.NEGOTIATION:
      return <GiReceiveMoney className="w-7 h-7 text-cyan-500  mb-3" />;
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
  const { projectBudget, projectDeadline, projectTitle } = buyersBrief;
  const userId = auth.currentUser?.uid;

  const [orderWith, setOrderWith] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchOrderWith = async (userId: string) => {
      console.log(userId);
      const response = await fetch(`/api/user?userId=${userId}`, {
        mode: 'no-cors',
        next: {
          tags: ['user-data'],
        },
      });
      const { user } = await response.json();
      setOrderWith(user);
    };

    const orderWithId = userId === buyerId ? sellerId : buyerId;
    fetchOrderWith(orderWithId);
  }, []);

  return (
    <div className="w-full p-6 bg-white border space-y-8 border-gray-200 rounded-lg shadow">
      <OrderStatusIcon status={status} />
      <Link
        href={`/order/${id}`}
        rel="noreffer"
        target="_blank"
        className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 hover:underline"
      >
        Order #{id}
      </Link>

      <div className="space-y-2">
        <p>
          <b>Project Title: </b>
          <span className="mb-3 font-normal text-gray-500">{projectTitle}</span>
        </p>

        <div className="flex items-center w-full space-x-4">
          <p>
            <b>Order Status: </b>
            <span className="mb-3 font-normal text-gray-500">{status}</span>
          </p>

          <p>
            <b>Project Budget: </b>
            <span className="mb-3 font-normal text-gray-500">
              ₹{projectBudget}
            </span>
          </p>

          <p>
            <b>Project Deadline: </b>
            <span className="mb-3 font-normal text-gray-500">
              {projectDeadline}
            </span>
          </p>
        </div>
      </div>

      {orderWith ? (
        <div className="flex items-center space-x-2">
          <Image
            alt={orderWith.displayName || 'User Profile Picture'}
            src={orderWith.photoURL || '/assets/Dummy Profile.png'}
            height={40}
            width={40}
            className="object-cover rounded-full overflow-hidden"
          />

          <div className="text-left">
            <Link
              target="_blank"
              rel="noreffer"
              href={`/profile/${orderWith.uid}`}
              className="text-base font-bold hover:underline"
            >
              {orderWith.displayName}
            </Link>
            <h3 className="text-sm text-gray-900">
              {orderWith.email || 'No title provided'}
            </h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderCard;
