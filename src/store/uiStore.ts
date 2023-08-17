import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  sideNavShow: boolean;
  toggleSideNav: () => void;
}

const useUiStore = create<UIState>()(
  devtools((set) => ({
    sideNavShow: false,
    toggleSideNav: () => {
      if (window.innerWidth < 1024)
        set((state) => ({ sideNavShow: !state.sideNavShow }));
    },
  }))
);

export default useUiStore;
