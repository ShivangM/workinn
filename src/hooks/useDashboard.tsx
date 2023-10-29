import Orders from '@/components/Dashboard/Orders';
import Overview from '@/components/Dashboard/Overview';
import Services from '@/components/Dashboard/Services';
import {
  BUYERS_DASHBOARD_TABS,
  SELLERS_DASHBOARD_TABS,
} from '@/constants/dashboardTabs';
import { DashboardTabs } from '@/interfaces/dashboard.d';
import { UserModes } from '@/interfaces/user.d';
import useDashboardStore from '@/store/dashboardStore';
import useUiStore from '@/store/uiStore';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';

const useDashboard = () => {
  const mode = useUiStore((state) => state.userMode);
  const [selectedTab] = useDashboardStore((state) => [state.selectedTab]);

  const [options, setOptions] = useState<
    {
      label: string;
      value: DashboardTabs;
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
    switch (selectedTab as DashboardTabs) {
      case DashboardTabs.ORDERS:
        return <Orders />;
      case DashboardTabs.OVERVIEW:
        return <Overview />;
      case DashboardTabs.SERVICES:
        return <Services />;
      default:
        return null; // or some default component
    }
  };

  return { options, Section };
};

export default useDashboard;
