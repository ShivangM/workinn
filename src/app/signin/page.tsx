'use client';
import { useEffect, useCallback } from 'react';
import 'firebaseui/dist/firebaseui.css';
import db, { auth } from '@/utils/firebase';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { setCookie } from 'cookies-next';

const SignIn = () => {
  const loadFirebaseui = useCallback(async () => {
    const firebaseui = await import('firebaseui');

    const firebaseUi =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: '/dashboard',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],

      tosUrl: 'tos',
      privacyPolicyUrl: 'privacy-policy',
      siteName: 'WorkInn',
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          if (authResult.additionalUserInfo?.isNewUser) {
            if (!authResult.user.emailVerified) {
              sendEmailVerification(authResult.user);
              toast.success(
                'Account created successfully 🎉. Please verify your email address.'
              );
            }

            setDoc(doc(db, 'users', authResult.user.uid), {
              email: authResult.user.email,
              uid: authResult.user.uid,
              displayName: authResult.user.displayName,
              photoURL: authResult.user.photoURL,
              phoneNumber: authResult.user.phoneNumber,
              creationTime: authResult.user.metadata.creationTime,
            });
          }

          authResult.user.getIdToken().then((token: string) => {
            setCookie('token', token);
          });

          return true;
        },
      },
    };

    firebaseUi.start('#firebaseui-auth-container', uiConfig);
  }, []);

  useEffect(() => {
    loadFirebaseui();
  }, [loadFirebaseui]);

  return (
    <main className="container mx-auto h-screen flex items-center justify-center">
      <div id="firebaseui-auth-container" />
    </main>
  );
};

export default SignIn;
