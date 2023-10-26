const admin = require('firebase-admin');

const populateDegreesCollection = async (db) => {
    const degrees = require("./degrees.json");

    try {
        for (const degree of degrees) {
            console.log(`Adding ${degree.id}`);

            const docRef = await db.collection('degrees').doc(degree.id).set({
                name: degree.name,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
        console.log('\n', 'Degrees Added', '\n');
    } catch (error) {
        console.error('Error adding degrees: ', error);
    }
};

module.exports = populateDegreesCollection;
