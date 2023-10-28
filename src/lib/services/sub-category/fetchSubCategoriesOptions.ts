import { SubCategory } from '@/interfaces/service';
import BASE_URL from '@/utils/baseUrl';

const fetchSubCategoryOptions = async (
  categoryId: string,
  searchTerm?: string
): Promise<SubCategory[]> => {
  const res = await fetch(
    searchTerm
      ? `${BASE_URL}/api/sub-categories?categoryId=${categoryId}&searchTerm=${searchTerm}`
      : `${BASE_URL}/api/sub-categories?categoryId=${categoryId}`,
    {
      mode: 'no-cors',
    }
  ).then((res) => res.json());

  return res.subCategories;
};

export default fetchSubCategoryOptions;
