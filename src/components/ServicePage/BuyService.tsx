'use client';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import { Service } from '@/interfaces/service';
import useServiceStore from '@/store/serviceStore';

type Props = {
  service: Service;
};

const BuyService = ({ service }: Props) => {
  const { convertInrToETH, convertInrToUSD } = useCurrencyConversion();
  const toggleSubmitBriefModal = useServiceStore(
    (state) => state.toggleSubmitBriefModal
  );

  const { price, sellerWalletAddress } = service;

  return (
    <div className="space-y-4 h-fit text-gray-600 bg-gray-50 rounded-lg shadow-md p-6">
      <h3 className="flex items-center justify-between text-base">
        <span>Price:</span>{' '}
        <span className="text-black font-bold text-xl">From ₹{price}</span>
      </h3>
      <p className="flex items-center justify-between text-base">
        <span>USD Price:</span>{' '}
        <span className="text-gray-800 font-bold">
          ${convertInrToUSD(price)}
        </span>
      </p>

      <div className="">
        <p className="flex items-center text-sm justify-between">
          <span>ETH Price:</span>{' '}
          <span className="text-gray-800 font-bold">
            {convertInrToETH(price)} ETH
          </span>
        </p>

        {sellerWalletAddress ? (
          <p className="flex items-center text-sm justify-between">
            <span>Seller Address: </span>{' '}
            <span className="text-gray-800 font-bold">
              {sellerWalletAddress.trim().slice(0, 6)}...
              {sellerWalletAddress.trim().slice(-4)}
            </span>
          </p>
        ) : null}
      </div>

      <button
        onClick={() => toggleSubmitBriefModal(service)}
        className="w-full btn"
      >
        Submit Brief
      </button>
    </div>
  );
};

export default BuyService;
