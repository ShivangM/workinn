import { BuyerDashboardTabs, SellerDashboardTabs } from '@/interfaces/dashboard.d';
import { Service } from '@/interfaces/service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DashboardState {
    selectedTab: BuyerDashboardTabs | SellerDashboardTabs;
    setSelectedTab: (tab: BuyerDashboardTabs | SellerDashboardTabs) => void;

    service: Service | null,

    deleteServiceModalOpen: boolean,
    toggleDeleteServiceModal: (service: Service | null) => void;

    toggelServiceStatusModalOpen: boolean,
    toggleServiceStatusModal: (service: Service | null) => void;
}

const initialState = {
    selectedTab: BuyerDashboardTabs.OVERVIEW,
    service: null,
    deleteServiceModalOpen: false,
    toggelServiceStatusModalOpen: false,
}

const useDashboardStore = create<DashboardState>()(
    devtools((set) => ({
        ...initialState,

        setSelectedTab: (tab: BuyerDashboardTabs | SellerDashboardTabs) => {
            set((state) => ({
                selectedTab: tab,
            }));
        },

        toggleDeleteServiceModal: (service: Service | null) => {
            set((state) => ({
                service,
                deleteServiceModalOpen: !state.deleteServiceModalOpen,
            }));
        },

        toggleServiceStatusModal: (service: Service | null) => {
            set((state) => ({
                service,
                toggelServiceStatusModalOpen: !state.toggelServiceStatusModalOpen,
            }));
        },
    }))
);

export default useDashboardStore;
