const admin = require('firebase-admin');

const populateCategoriesCollection = async (db) => {
    const categories = require("./categories.json");

    try {
        for (const category of categories) {
            console.log(`Adding ${category.name}`);
            const categoryRef = await db.collection('categories').add({
                name: category.name,
                description: category.description,
                faqs: category.faqs,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            const subCategories = category.subCategories;
            for (const subCategory of subCategories) {
                console.log(`Adding ${subCategory.name}`);
                const subCategoryRef = await categoryRef.collection('sub-categories').add({
                    name: subCategory.name,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });

                const serviceCategories = subCategory.serviceCategories;
                for (const serviceCategory of serviceCategories) {
                    console.log(`Adding ${serviceCategory.name}`);
                    await subCategoryRef.collection('service-categories').add({
                        name: serviceCategory.name,
                        description: serviceCategory.description,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });
                }
            }
        }
        console.log('\n', 'Categories Added', '\n');
    } catch (error) {
        console.error('Error adding categories: ', error);
    }
};

module.exports = populateCategoriesCollection;
