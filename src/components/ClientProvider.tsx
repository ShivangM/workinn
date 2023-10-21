'use client';
import useUserStore from '@/store/userStore';
import { auth } from '@/utils/firebase';
import { useEffect, ReactNode } from 'react';

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [setUserData, userData] = useUserStore((state) => [state.setUserData, state.userData]);
  console.log(userData)

  useEffect(() => {
    const listner = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          setUserData(user);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      listner();
    };
  }, []);

  return <div>{children}</div>;
};

export default ClientProvider;
