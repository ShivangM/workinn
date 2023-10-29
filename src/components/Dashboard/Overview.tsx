import { Stat } from '@/interfaces/typing';
import { FaMoneyBill } from 'react-icons/fa';
import { IoBagRemoveSharp } from 'react-icons/io5';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Stats from './Stats';

type Props = {};

const buyersStats: Stat[] = [
  {
    name: 'Active Orders',
    value: 4,
    Icon: IoBagRemoveSharp,
  },
  {
    name: 'Amount Spent',
    value: 4,
    Icon: FaMoneyBill,
  },
  {
    name: 'Briefs',
    value: 4,
    Icon: BsFillBagCheckFill,
  },
];

const Overview = (props: Props) => {
  return (
    <div>
      <div className="p-6">
        <Stats stats={buyersStats} />
      </div>
    </div>
  );
};

export default Overview;
