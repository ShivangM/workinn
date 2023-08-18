'use client';
import { useEffect, useCallback } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { auth, uiConfig } from '@/utils/firebase';

const SignIn = () => {
  const loadFirebaseui = useCallback(async () => {
    const firebaseui = await import('firebaseui');
    const firebaseUi =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    firebaseUi.start('#firebaseui-auth-container', uiConfig);
  }, []);

  useEffect(() => {
    loadFirebaseui();
  }, []);

  return (
    <main className="py-20">
      <div id="firebaseui-auth-container" />
    </main>
  );
};

export default SignIn;
