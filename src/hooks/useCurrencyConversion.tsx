import fetchETHRates from '@/lib/fetchETHRates'
import React, { useEffect, useState } from 'react'

const useCurrencyConversion = () => {
    //To-Do: Move this to a custom hook
    const [inrToUSDPrice, setInrToUSDPrice] = useState<number>(0.012)

    const [ethToINRPrice, setEthToINRPrice] = useState<number>(0)

    useEffect(() => {
        const fetchETHRatesHandler = async () => {
            try {
                const { data } = await fetchETHRates();
                setEthToINRPrice(data.INR);
            } catch (error) {
                console.error('Error fetching ETH rates:', error);
            }
        };

        // Initial call
        fetchETHRatesHandler();

        // Set up interval to call the function every 1 second
        const intervalId = setInterval(fetchETHRatesHandler, 10000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return { inrToUSDPrice, ethToINRPrice }
}

export default useCurrencyConversion