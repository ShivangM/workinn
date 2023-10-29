import { DashboardTabs } from '@/interfaces/dashboard.d';
import { BsCartFill } from 'react-icons/bs';
import { GiSellCard } from 'react-icons/gi';
import { IoBagRemoveSharp, IoStatsChartSharp } from 'react-icons/io5';

const BUYERS_DASHBOARD_TABS = [
  { label: 'Overview', value: DashboardTabs.OVERVIEW, Icon: IoStatsChartSharp },
  { label: 'Orders', value: DashboardTabs.ORDERS, Icon: BsCartFill },
];

const SELLERS_DASHBOARD_TABS = [
  { label: 'Overview', value: DashboardTabs.OVERVIEW, Icon: IoStatsChartSharp },
  { label: 'Services', value: DashboardTabs.SERVICES, Icon: GiSellCard },
  {
    label: 'Orders',
    value: DashboardTabs.ORDERS,
    Icon: IoBagRemoveSharp,
  },
];

export { BUYERS_DASHBOARD_TABS, SELLERS_DASHBOARD_TABS };
