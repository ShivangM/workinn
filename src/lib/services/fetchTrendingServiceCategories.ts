import { ServiceCategory } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 10;

const fetchTrendingServiceCategories = async (
  page = 0,
  category: string,
  subCategory: string
): Promise<APIResponse<ServiceCategory[]>> => {
  const serviceCategoriesRef = db
    .collection('categories')
    .doc(category)
    .collection('sub-categories')
    .doc(subCategory)
    .collection('service-categories');

  const total = await serviceCategoriesRef
    .count()
    .get()
    .then((snapshot) => snapshot.data().count);

  const pageTotal = Math.ceil(total / PAGE_LIMIT);

  const serviceCategoriesSnapshot = await serviceCategoriesRef
    .limit(PAGE_LIMIT)
    .offset(page * PAGE_LIMIT)
    .get();

  const data = serviceCategoriesSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.categoryId = category;
    data.subCategoryId = subCategory;
    return data;
  }) as ServiceCategory[];

  return { data, total, pageTotal };
};

export default fetchTrendingServiceCategories;
