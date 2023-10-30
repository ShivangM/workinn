import { Order, OrderStatus } from '@/interfaces/order.d';
import { auth } from '@/utils/firebase';
import { useEffect, useState } from 'react';

type Props = {
  order: Order;
};

const useOrder = ({ order }: Props) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signButtonDisabled, setSignButtonDisabled] = useState(false);
  const [signButtonText, setSignButtonText] = useState('Sign Order');

  useEffect(() => {
    if (isBuyer && order && order.status === OrderStatus.NEGOTIATION) {
      setSignButtonDisabled(true);
      setSignButtonText('Negotiation in progress');
    }

    if (isBuyer && order && order.status === OrderStatus.AWAITING_SIGNATURE) {
      setSignButtonDisabled(false);
      setSignButtonText('Sign Order');
    }

    if (!isBuyer && order && order.status === OrderStatus.NEGOTIATION) {
      setSignButtonDisabled(false);
      setSignButtonText('Sign Order');
    }

    if (!isBuyer && order && order.status === OrderStatus.AWAITING_SIGNATURE) {
      setSignButtonDisabled(true);
      setSignButtonText('Order Signed');
    }

    if (isBuyer && order && order.status === OrderStatus.IN_PROGRESS) {
      setSignButtonDisabled(true);
      setSignButtonText('Order in progress');
    }

    if (!isBuyer && order && order.status === OrderStatus.IN_PROGRESS) {
      setSignButtonDisabled(false);
      setSignButtonText('Submit Milestone');
    }
  }, [order, isBuyer]);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user?.uid === order.buyerId) {
          setIsBuyer(true);
        } else {
          setIsBuyer(false);
        }
        setLoading(false);
      });

      return unsubscribe;
    }
  }, [order]);

  return {
    isBuyer,
    loading,
    signButtonDisabled,
    signButtonText,
  };
};

export default useOrder;
