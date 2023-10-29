import { DashboardTabs } from '@/interfaces/dashboard.d';
import { Service } from '@/interfaces/service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DashboardState {
  selectedTab: DashboardTabs;
  setSelectedTab: (tab: DashboardTabs) => void;

  service: Service | null;

  deleteServiceModalOpen: boolean;
  toggleDeleteServiceModal: (service: Service | null) => void;

  toggelServiceStatusModalOpen: boolean;
  toggleServiceStatusModal: (service: Service | null) => void;
}

const initialState = {
  selectedTab: DashboardTabs.OVERVIEW,
  service: null,
  deleteServiceModalOpen: false,
  toggelServiceStatusModalOpen: false,
};

const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    ...initialState,

    setSelectedTab: (tab: DashboardTabs) => {
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
