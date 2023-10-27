import { SubCategory } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const fetchSubCategory = async (categoryId: string, subCategoryId: string): Promise<APIResponse<SubCategory>> => {
    const subCategoryRef = db.collection('categories').doc(categoryId).collection('sub-categories').doc(subCategoryId);
    const subCategorySnapshot = await subCategoryRef.get();
    const subCategory = {
        id: subCategorySnapshot.id,
        categoryId,
        ...subCategorySnapshot.data(),
    } as SubCategory;

    return { data: subCategory };
};

export default fetchSubCategory;
