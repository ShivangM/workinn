import fetchETHRates from '@/lib/fetchETHRates';
import { useEffect, useState } from 'react';

const useCurrencyConversion = () => {
  //To-Do: Move this to a custom hook
  const [usdConversionRate, setUsdConversionRate] = useState<number>(0.012);
  const [ethConversionRate, setEthConversionRate] = useState<number>(1);

  useEffect(() => {
    const fetchETHRatesHandler = async () => {
      try {
        const { data } = await fetchETHRates();
        setEthConversionRate(1 / data.INR);
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

  const convertInrToUSD = (inr: number) =>
    (inr * usdConversionRate).toPrecision(4);
  const convertInrToETH = (inr: number) =>
    (inr * ethConversionRate).toPrecision(10);

  return { convertInrToUSD, convertInrToETH };
};

export default useCurrencyConversion;
