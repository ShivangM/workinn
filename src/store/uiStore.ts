import { UserModes } from '@/interfaces/user.d';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  sideNavShow: boolean;
  userMode: UserModes;
  toggleSideNav: () => void;
  toggleUserMode: () => void;
}

const useUiStore = create<UIState>()(
  devtools((set) => ({
    sideNavShow: false,
    userMode: UserModes.BUYER,
    toggleSideNav: () => {
      if (window.innerWidth < 1024)
        set((state) => ({ sideNavShow: !state.sideNavShow }));
    },

    toggleUserMode: () =>
      set((state) => ({
        userMode:
          state.userMode === UserModes.BUYER
            ? UserModes.SELLER
            : UserModes.BUYER,
      })),
  }))
);

export default useUiStore;
