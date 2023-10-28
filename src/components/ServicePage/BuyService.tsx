'use client';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';

type Props = {
  price: number;
  sellerWalletAddress: string;
};

const BuyService = ({ price, sellerWalletAddress }: Props) => {
  const { convertInrToETH, convertInrToUSD } = useCurrencyConversion();

  return (
    <div className="space-y-4 h-fit text-gray-600 bg-gray-50 rounded-lg shadow-md p-6">
      <h3 className="flex items-center justify-between text-base">
        <span>Price:</span>{' '}
        <span className="text-black font-bold text-xl">From ₹{price}</span>
      </h3>
      <p className="flex items-center justify-between text-base">
        <span>USD Price:</span>{' '}
        <span className="text-black font-bold">${convertInrToUSD(price)}</span>
      </p>

      <div className="">
        <p className="flex items-center text-sm justify-between">
          <span>ETH Price:</span>{' '}
          <span className="text-black font-bold">
            {convertInrToETH(price)} ETH
          </span>
        </p>
        <p className="flex items-center text-sm justify-between">
          <span>Seller Address: </span>{' '}
          <span className="text-black font-bold">
            {sellerWalletAddress.trim().slice(0, 6)}...
            {sellerWalletAddress.trim().slice(-4)}
          </span>
        </p>
      </div>

      <button className="w-full btn">Submit Brief</button>
    </div>
  );
};

export default BuyService;
