import { Category } from '@/interfaces/service';
import { db } from '@/utils/firebaseAdmin';

const PAGE_LIMIT = 10;

const fetchCategories = async (page = 1): Promise<APIResponse<Category[]>> => {
  const categoriesRef = db.collection('categories');
  const total = await categoriesRef
    .count()
    .get()
    .then((snapshot) => snapshot.data().count);
  const pageTotal = Math.ceil(total / PAGE_LIMIT);

  const categoriesSnapshot = await categoriesRef
    .limit(PAGE_LIMIT)
    .offset(page * PAGE_LIMIT)
    .get();

  const data = categoriesSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  }) as Category[];

  return { data, total, pageTotal };
};

export default fetchCategories;
