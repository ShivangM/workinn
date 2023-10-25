import { ServiceCategory } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 10;

const fetchServiceCategories = async (categoryId: string, subCategoryId: string, page = 1): Promise<APIResponse<ServiceCategory[]>> => {
    const serviceCategoriesRef = db.collection('categories').doc(categoryId).collection('sub-categories').doc(subCategoryId).collection('service-categories').orderBy('name', 'asc');

    const total = await serviceCategoriesRef
        .count()
        .get()
        .then((snapshot) => snapshot.data().count);

    const pageTotal = Math.ceil(total / PAGE_LIMIT);

    const serviceCategoriesSnapshot = await serviceCategoriesRef.limit(PAGE_LIMIT)
        .offset((page - 1) * PAGE_LIMIT)
        .get();

    const serviceCategorries = serviceCategoriesSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.subCategoryId = subCategoryId;
        data.categoryId = categoryId;
        return data;
    }) as ServiceCategory[];

    return { data: serviceCategorries, total, pageTotal };
};

export default fetchServiceCategories;
