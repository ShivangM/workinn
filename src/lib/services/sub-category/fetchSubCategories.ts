import { SubCategory } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 10;

const fetchSubCategories = async (categoryId: string, page = 1): Promise<APIResponse<SubCategory[]>> => {
    const subCategoriesRef = db.collection('categories').doc(categoryId).collection('sub-categories').orderBy('name', 'asc');

    const total = await subCategoriesRef
        .count()
        .get()
        .then((snapshot) => snapshot.data().count);

    const pageTotal = Math.ceil(total / PAGE_LIMIT);

    const subCategoriesSnapshot = await subCategoriesRef
        .limit(PAGE_LIMIT)
        .offset((page - 1) * PAGE_LIMIT)
        .get();

    const data = subCategoriesSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.categoryId = categoryId;
        return data;
    }) as SubCategory[];

    return { data, total, pageTotal };
};

export default fetchSubCategories;
