import { Order } from '@/interfaces/order';
import fetchService from '@/lib/services/service/fetchService';
import BuyersBrief from './BuyersBrief';
import SellersBrief from './SellersBrief';
import ServiceBrief from './ServiceBrief';

type Props = {
  order: Order;
};

const OrderDetails = async ({ order }: Props) => {
  const { id, buyersBrief, serviceId, sellersBrief } = order;
  const { data: service } = await fetchService(serviceId);

  return (
    <div className="bg-white rounded-xl p-8 h-full w-full space-y-4">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold capitalize">
        Order #{id}
      </h3>
      <ServiceBrief service={service} />
      <BuyersBrief buyerBrief={buyersBrief} />
      {sellersBrief ? <SellersBrief sellerBrief={sellersBrief} /> : null}
    </div>
  );
};

export default OrderDetails;
