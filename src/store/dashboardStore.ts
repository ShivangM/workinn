import { BuyerDashboardTabs, SellerDashboardTabs } from '@/interfaces/dashboard.d';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DashboardState {
    selectedTab: BuyerDashboardTabs | SellerDashboardTabs;
    setSelectedTab: (tab: BuyerDashboardTabs | SellerDashboardTabs) => void;
}

const initialState = {
    selectedTab: BuyerDashboardTabs.OVERVIEW,
}

const useDashboardStore = create<DashboardState>()(
    devtools((set) => ({
        ...initialState,
        setSelectedTab: (tab: BuyerDashboardTabs | SellerDashboardTabs) => {
            set((state) => ({
                selectedTab: tab,
            }));
        },
    }))
);

export default useDashboardStore;
