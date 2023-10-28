import { Category } from '@/interfaces/service';
import { APIResponse } from '@/interfaces/typing';
import { db } from '@/utils/firebaseAdmin';

const fetchCategory = async (
  categoryId: string
): Promise<APIResponse<Category>> => {
  const categoryRef = db.collection('categories').doc(categoryId);
  const categorySnapshot = await categoryRef.get();
  const category = {
    id: categorySnapshot.id,
    ...categorySnapshot.data(),
  } as Category;

  return { data: category };
};

export default fetchCategory;
