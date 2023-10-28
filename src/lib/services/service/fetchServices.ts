import { Service } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 10;

const fetchServices = async (
  categoryId: string,
  subCategoryId: string,
  serviceCategoryId: string,
  page: number
): Promise<APIResponse<Service[]>> => {
  const servicesRef = db
    .collection('services')
    .where('categoryId', '==', categoryId)
    .where('subCategoryId', '==', subCategoryId)
    .where('serviceCategoryId', '==', serviceCategoryId)
    .where('isPaused', '==', false);

  const total = await servicesRef
    .count()
    .get()
    .then((snapshot) => snapshot.data().count);

  const pageTotal = Math.ceil(total / PAGE_LIMIT);

  const servicesSnapshot = await servicesRef
    .limit(PAGE_LIMIT)
    .offset((page - 1) * PAGE_LIMIT)
    .get();

  const data = servicesSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  }) as Service[];

  return { data, total, pageTotal };
};

export default fetchServices;
