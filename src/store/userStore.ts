import { auth } from '@/utils/firebase';
import { signOut, User } from 'firebase/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  userData: null | User;
  setUserData: (user: User) => void;
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

    setUserData: (user: User) => {
      set({ userData: user });
    },

    logout: async () => {
      signOut(auth)
        .then(() => {
          set({ userData: null });
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
