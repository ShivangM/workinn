import { Category, ServiceCategory, SubCategory } from '@/interfaces/service';
import { db } from '@/utils/firebaseAdmin';

const fetchCategory = async (id: string): Promise<APIResponse<Category>> => {
    const categoryRef = db.collection('categories').doc(id);
    const subCategoriesRef = categoryRef.collection('sub-categories').orderBy('name', 'asc');
    const subCategories = await subCategoriesRef.get().then(async (snapshot) => {
        const subCategoriesData = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const subCategoryId = doc.id;
            data.id = subCategoryId;
            data.categoryId = id;

            const serviceCategoriesRef = categoryRef.collection('sub-categories').doc(doc.id).collection('service-categories').orderBy('name', 'asc');
            const serviceCategoriesSnapshot = await serviceCategoriesRef.get();
            const serviceCategories = serviceCategoriesSnapshot.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                data.subCategoryId = subCategoryId;
                data.categoryId = id;
                return data;
            });

            data.serviceCategories = serviceCategories as ServiceCategory[];

            return data;
        })) as SubCategory[];

        return subCategoriesData;
    });


    const categorySnapshot = await categoryRef.get()
    const category = categorySnapshot.data() as Category;
    category.id = id;
    category.subCategories = subCategories;

    return { data: category };
};

export default fetchCategory;
