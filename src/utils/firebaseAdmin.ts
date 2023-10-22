import { ServiceAccount } from 'firebase-admin/app';
import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
} catch (error: any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();
const bucket = getStorage().bucket(
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string
);

const auth = admin.auth();

export { auth, bucket, db };
export default admin;
