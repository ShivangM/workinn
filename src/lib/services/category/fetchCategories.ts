import { Category } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 10;

const fetchCategories = async (page = 1): Promise<APIResponse<Category[]>> => {
  const categoriesRef = db.collection('categories').orderBy('name', 'asc');

  const total = await categoriesRef
    .count()
    .get()
    .then((snapshot) => snapshot.data().count);

  const pageTotal = Math.ceil(total / PAGE_LIMIT);

  const categoriesSnapshot = await categoriesRef
    .limit(PAGE_LIMIT)
    .offset((page - 1) * PAGE_LIMIT)
    .get();

  const data = categoriesSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  }) as Category[];

  return { data, total, pageTotal };
};

export default fetchCategories;
