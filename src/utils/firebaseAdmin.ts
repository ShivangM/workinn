import { ServiceAccount } from 'firebase-admin/app';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
    })
    console.log('Initialized.')
} catch (error: any) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}

export default admin
