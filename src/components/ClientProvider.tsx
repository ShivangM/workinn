'use client';
import useUserStore from '@/store/userStore';
import { auth } from '@/utils/firebase';
import { useEffect, ReactNode } from 'react';
import { setCookie } from 'cookies-next';

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [setUserData, setToken] = useUserStore((state) => [
    state.setUserData,
    state.setToken,
  ]);

  useEffect(() => {
    const listner = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          setUserData(user);
          const token = await user.getIdToken();
          setToken(token);
          setCookie('token', token);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    console.log("ran client provider's use effect function");

    return () => {
      listner();
    };
  }, [setToken, setUserData]);

  return <div>{children}</div>;
};

export default ClientProvider;
