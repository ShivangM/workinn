import { Order } from '@/interfaces/order';
import { UserData } from '@/interfaces/user';
import fetchUserData from '@/lib/profile/fetchUserData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CancelOrderButton from './CancelOrderButton';
import FreezeOrderButton from './EditOrderButton';
import SignOrderButton from './SignOrderButton';

type Props = {
  order: Order;
};

const UserInfo = ({ user }: { user: UserData }) => {
  const { displayName, email, photoURL, uid } = user;

  return (
    <div className="flex items-center space-x-2">
      <Image
        alt={displayName || 'User Profile Picture'}
        src={photoURL || '/assets/Dummy Profile.png'}
        height={40}
        width={40}
        className="object-cover rounded-full overflow-hidden"
      />

      <div className="text-left">
        <Link
          target="_blank"
          rel="noreffer"
          href={`/profile/${uid}`}
          className="text-sm font-bold hover:underline"
        >
          {displayName}
        </Link>
        <h3 className="text-xs text-gray-900">
          {email || 'No title provided'}
        </h3>
      </div>
    </div>
  );
};

const OrderActions = async ({ order }: Props) => {
  const { data: seller } = await fetchUserData(order.sellerId);
  const { data: buyer } = await fetchUserData(order.buyerId);

  return (
    <div className="bg-white rounded-xl p-6 h-full w-full max-w-xs space-y-4">
      {seller ? (
        <div className="space-y-2">
          <h3 className="font-semibold">Seller</h3>
          <UserInfo user={seller} />
        </div>
      ) : null}
      {buyer ? (
        <div className="space-y-2">
          <h3 className="font-semibold">Buyer</h3>
          <UserInfo user={buyer} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pt-6">
        <CancelOrderButton order={order} />
        <SignOrderButton order={order} />
      </div>
    </div>
  );
};

export default OrderActions;
