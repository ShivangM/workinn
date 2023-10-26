import { ServiceCategory } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const fetchServiceCategory = async (categoryId: string, subCategoryId: string, serviceCategoryId: string): Promise<APIResponse<ServiceCategory>> => {
    const serviceCategoryRef = db.collection('categories').doc(categoryId).collection('sub-categories').doc(subCategoryId).collection('service-categories').doc(serviceCategoryId);

    const serviceCategorySnapshot = await serviceCategoryRef.get();
    const serviceCategory = {
        id: serviceCategorySnapshot.id,
        categoryId,
        subCategoryId,
        ...serviceCategorySnapshot.data(),
    } as ServiceCategory;

    return { data: serviceCategory };
};

export default fetchServiceCategory;
