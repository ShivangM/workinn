import { Service } from '@/interfaces/service';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ServiceState {
  service: Service | null;
  submitBriefModalOpen: boolean;
  toggleSubmitBriefModal: (service: Service | null) => void;
}

const initialState = {
  service: null,
  submitBriefModalOpen: false,
};

const useServiceStore = create<ServiceState>()(
  devtools((set) => ({
    ...initialState,

    toggleSubmitBriefModal: (service) =>
      set((state) => ({
        service,
        submitBriefModalOpen: !state.submitBriefModalOpen,
      })),
  }))
);

export default useServiceStore;
