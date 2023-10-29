import { Order } from '@/interfaces/order';
import { APIResponse } from '@/interfaces/typing';
import { UserModes } from '@/interfaces/user';
import BASE_URL from '@/utils/baseUrl';

const fetchOrders = async (mode: UserModes): Promise<APIResponse<Order[]>> => {
  const res = await fetch(`${BASE_URL}/api/user/orders?mode=${mode}`, {
    mode: 'no-cors',
    next: {
      tags: ['user-orders'],
    },
  }).then((res) => res.json());

  return {
    data: res.orders,
  };
};

export default fetchOrders;
