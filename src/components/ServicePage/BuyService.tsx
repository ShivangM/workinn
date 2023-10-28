'use client'

import useCurrencyConversion from "@/hooks/useCurrencyConversion";

type Props = {
    price: number
    sellerWalletAddress?: string
}

const BuyService = ({ price, sellerWalletAddress }: Props) => {
    const { ethToINRPrice, inrToUSDPrice } = useCurrencyConversion();

    return (
        <div className="col-span-2 space-y-4 h-fit text-gray-600 bg-gray-50 rounded-lg sticky shadow-md top-0 p-6">
            <h3 className='flex items-center justify-between text-base'><span>Price:</span> <span className='text-black font-bold text-xl' >From ₹{price}</span></h3>
            {
                sellerWalletAddress && (
                    <h3 className='flex items-center justify-between text-base'><span>ETH Price:</span> <span className='text-black font-bold text-xl' >{price / ethToINRPrice} ETH</span></h3>
                )
            }

            <button className="w-full btn">Buy Now</button>
        </div>
    )
}

export default BuyService