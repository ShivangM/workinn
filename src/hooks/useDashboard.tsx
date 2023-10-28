import BuyerOrders from '@/components/Dashboard/Buyer/BuyerOrders';
import BuyerOverview from '@/components/Dashboard/Buyer/BuyerOverview';
import SellerOrders from '@/components/Dashboard/Seller/SellerOrders';
import SellerOverview from '@/components/Dashboard/Seller/SellerOverview';
import SellerServices from '@/components/Dashboard/Seller/SellerServices';
import {
  BUYERS_DASHBOARD_TABS,
  SELLERS_DASHBOARD_TABS,
} from '@/constants/dashboardTabs';
import {
  BuyerDashboardTabs,
  SellerDashboardTabs,
} from '@/interfaces/dashboard.d';
import { UserModes } from '@/interfaces/user.d';
import useDashboardStore from '@/store/dashboardStore';
import useUiStore from '@/store/uiStore';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons//lib';

const useDashboard = () => {
  const mode = useUiStore((state) => state.userMode);
  const [selectedTab] = useDashboardStore((state) => [state.selectedTab]);

  const [options, setOptions] = useState<
    {
      label: string;
      value: BuyerDashboardTabs | SellerDashboardTabs;
      Icon: IconType;
    }[]
  >(BUYERS_DASHBOARD_TABS);

  useEffect(() => {
    if (mode === UserModes.BUYER) {
      setOptions(BUYERS_DASHBOARD_TABS);
    } else {
      setOptions(SELLERS_DASHBOARD_TABS);
    }
  }, [mode]);

  const Section = () => {
    if (mode === UserModes.BUYER) {
      switch (selectedTab as BuyerDashboardTabs) {
        case BuyerDashboardTabs.ORDERS:
          return <BuyerOrders />;

        case BuyerDashboardTabs.OVERVIEW:
          return <BuyerOverview />;

        default:
          break;
      }
    } else {
      switch (selectedTab as SellerDashboardTabs) {
        case SellerDashboardTabs.ORDERS:
          return <SellerOrders />;

        case SellerDashboardTabs.OVERVIEW:
          return <SellerOverview />;

        case SellerDashboardTabs.SERVICES:
          return <SellerServices />;

        default:
          break;
      }
    }
  };

  return { options, Section };
};

export default useDashboard;
