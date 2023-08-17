import { UserData } from '@/interfaces/user';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  userData: null | UserData;
  login: () => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        login: () => {},
        logout: () => {},
      }),
      {
        name: 'user-storage',
      }
    )
  )
);

export default useUserStore;
