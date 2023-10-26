const { collection, doc, setDoc, serverTimestamp } = require("firebase/firestore");

const degrees = [
    {
        "name": "Associate",
        "id": "Associate"
    },
    {
        "name": "Certificate",
        "id": "Certificate"
    },
    {
        "name": "Bachelor of Arts",
        "id": "BA"
    },
    {
        "name": "Bachelor of Architecture",
        "id": "BArch"
    },
    {
        "name": "Bachelor of Music",
        "id": "BM"
    },
    {
        "name": "Bachelor of Fine Arts",
        "id": "BFA"
    },
    {
        "name": "Bachelor of Science",
        "id": "BSc"
    },
    {
        "name": "Master of Arts",
        "id": "MA"
    },
    {
        "name": "Master of Business Administration",
        "id": "MBA"
    },
    {
        "name": "Master of Science",
        "id": "MSc"
    },
    {
        "name": "Master of Fine Arts",
        "id": "MFA"
    },
    {
        "name": "Juris Doctor",
        "id": "JD"
    },
    {
        "name": "Doctor of Medicine",
        "id": "MD"
    },
    {
        "name": "Doctor of Philosophy",
        "id": "PhD"
    },
    {
        "name": "Bachelor of Laws",
        "id": "LLB"
    },
    {
        "name": "Master of Laws",
        "id": "LLM"
    },
    {
        "name": "Other",
        "id": "Other"
    }
]

console.log('Adding Degrees...', '\n');

const populateDegreesCollection = async (db) => {
    const promises = degrees.map((degree) => {
        console.log(`Adding ${degree.id}`);

        const collectionRef = collection(db, 'degrees');
        const docRef = doc(collectionRef, degree.id);
        return setDoc(docRef, {
            name: degree.name,
            timestamp: serverTimestamp(),
        });
    });

    await Promise.all(promises).then(() => {
        console.log('\n', 'Degrees Added', '\n');
    }).catch((error) => {
        console.error('Error adding degrees: ', error);
    });
};

module.exports = populateDegreesCollection;

