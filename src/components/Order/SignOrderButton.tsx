'use client';
import useOrder from '@/hooks/useOrder';
import { Order, OrderStatus } from '@/interfaces/order.d';
import { auth } from '@/utils/firebase';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

type Props = {
  order: Order;
};

const SignOrderButton = ({ order }: Props) => {
  const { signButtonDisabled, signButtonText, isBuyer } = useOrder({ order });
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleSignOrder = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  };
  return (
    <button
      disabled={signButtonDisabled}
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{signButtonText || 'Loading...'}</span>
    </button>
  );
};

export default SignOrderButton;
