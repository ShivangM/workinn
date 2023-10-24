import { UserData } from '@/interfaces/user';
import { auth } from '@/utils/firebase';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  token: string | null;
  setToken: (token: string) => void;
  userData: null | UserData;
  setUserData: (user: UserData) => void;
  loading: {
    loadingState: boolean;
    loadingMessage?: string;
  };
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    userData: null,
    loading: {
      loadingState: false,
    },
    token: null,

    setToken: (token: string) => {
      set({ token });
    },

    setUserData: (user: UserData) => {
      set({ userData: user });
    },

    logout: async () => {
      signOut(auth)
        .then(() => {
          set({ userData: null, token: null });
          deleteCookie('token');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    },
  }))
);

export default useUserStore;
