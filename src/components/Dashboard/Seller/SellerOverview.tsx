import { Stat } from '@/interfaces/typing'
import { FaMoneyBill } from 'react-icons/fa'
import { GiSellCard } from 'react-icons/gi'
import { IoBagRemoveSharp } from 'react-icons/io5'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Stats from '../Stats'

type Props = {}

const sellersStats: Stat[] = [
    {
        name: 'Active Orders',
        value: 4,
        Icon: IoBagRemoveSharp
    },
    {
        name: 'Services',
        value: 4,
        Icon: GiSellCard
    },
    {
        name: 'Earning',
        value: 4,
        Icon: FaMoneyBill
    },
    {
        name: 'Orders Completed',
        value: 4,
        Icon: BsFillBagCheckFill
    },
]

const SellerOverview = (props: Props) => {
    return (
        <div>
            <div className="p-6">
                <Stats stats={sellersStats} />
            </div>
        </div>
    )
}

export default SellerOverview