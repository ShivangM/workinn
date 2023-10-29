const populateDegreesCollection = require('./populateDegreesCollection');
const populateLanguagesCollection = require('./populateLanguagesCollection');
const populateCategoriesCollection = require('./populateCategoriesCollection');
const dotenv = require('dotenv');
const path = require('path');
const admin = require('firebase-admin');

dotenv.config({
  path: path.resolve(__dirname, '../../.env.local'),
});

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();

const populateDatabase = async () => {
  await populateDegreesCollection(db);
  await populateLanguagesCollection(db);
  await populateCategoriesCollection(db);
};

populateDatabase().then(() => {
  process.exit(0);
});
