const { getApp, getApps, initializeApp } = require("firebase/app");
const populateDegreesCollection = require("./populateDegreesCollection");
const populateLanguagesCollection = require("./populateLanguagesCollection");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, "../../.env.local"),
});
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const apps = getApps();
const app = !apps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const populateDatabase = async () => {
    await populateDegreesCollection(db);
    await populateLanguagesCollection(db);
}

populateDatabase().then(() => {
    process.exit(0);
});