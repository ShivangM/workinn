const admin = require('firebase-admin');

const populateLanguagesCollection = async (db) => {
  const isoLangs = require("./isoLangs.json");

  try {
    for (const code of Object.keys(isoLangs)) {
      const language = isoLangs[code];
      console.log(`Adding ${language.name}`);

      const docRef = await db.collection('languages').doc(code).set({
        name: language.name,
        nativeName: language.nativeName,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log('\n', 'Languages Added', '\n');
  } catch (error) {
    console.error('Error adding languages:', error);
  }
};

module.exports = populateLanguagesCollection;
