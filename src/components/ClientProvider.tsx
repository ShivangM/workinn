'use client';
import { auth } from '@/utils/firebase';
import { useEffect, ReactNode } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const listner = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setCookie('token', token);
        } else {
          deleteCookie('token');
          router.push('/signin');
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
