import { BasicDetails } from '@/interfaces/user';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ProfileState {
  editBasicDetailsModalOpen: boolean;
  basicDetails: BasicDetails | null;
  toggleEditBasicDetailsModal: (basicDetails: BasicDetails | null) => void;
}

const initialState = {
  basicDetails: null,
  editBasicDetailsModalOpen: false,
};

const useProfileStore = create<ProfileState>()(
  devtools((set) => ({
    ...initialState,
    toggleEditBasicDetailsModal: (basicDetails) => {
      set((state) => ({
        editBasicDetailsModalOpen: !state.editBasicDetailsModalOpen,
        basicDetails,
      }));
    },
  }))
);

export default useProfileStore;
