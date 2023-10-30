'use client';
import { Order, OrderStatus } from '@/interfaces/order.d';
import { auth } from '@/utils/firebase';
import React, { useEffect, useState } from 'react';

type Props = {
  order: Order;
};

const SignOrderButton = ({ order }: Props) => {
  const userId = auth.currentUser?.uid;
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      if (
        order.status === OrderStatus.NEGOTIATION &&
        userId === order.buyerId
      ) {
        setDisableButton(true);
        setButtonText(null);
      }

      if (
        order.status === OrderStatus.AWAITING_SIGNATURE &&
        userId === order.sellerId
      ) {
        setDisableButton(true);
        setButtonText('Signed');
      }
    }
  }, [order, userId]);

  return (
    <button
      disabled={disableButton}
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{buttonText || 'Sign Order'}</span>
    </button>
  );
};

export default SignOrderButton;
