'use client';
import { auth } from '@/utils/firebase';
import { useEffect, ReactNode } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/userStore';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/utils/firebase';
import { UserData } from '@/interfaces/user';

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [setUserData, setToken] = useUserStore((state) => [state.setUserData, state.setToken]);

  useEffect(() => {
    const listner = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setCookie('token', token);
          setToken(token);
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data() as UserData;
          setUserData(userData);
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
