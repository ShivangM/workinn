import { ServiceCategory } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 2;

const fetchTrendingServiceCategories = async (): Promise<APIResponse<ServiceCategory[]>> => {
  const categoriesSnapshot = await db.collection('categories').get();
  const data: ServiceCategory[] = [];

  for (const categoryDoc of categoriesSnapshot.docs) {
    const subCategoriesRef = categoryDoc.ref.collection('sub-categories');
    const subCategoriesSnapshot = await subCategoriesRef.get();

    for (const subCategoryDoc of subCategoriesSnapshot.docs) {
      const serviceCategoriesRef = subCategoryDoc.ref.collection('service-categories');
      const serviceCategoriesSnapshot = await serviceCategoriesRef.limit(PAGE_LIMIT).get();

      for (const doc of serviceCategoriesSnapshot.docs) {
        const serviceCategoryData = doc.data() as ServiceCategory;
        serviceCategoryData.id = doc.id;
        serviceCategoryData.categoryId = categoryDoc.id;
        serviceCategoryData.subCategoryId = subCategoryDoc.id;
        data.push(serviceCategoryData);
      }
    }
  }

  return { data, total: data.length, pageTotal: 1 };
};

export default fetchTrendingServiceCategories;
