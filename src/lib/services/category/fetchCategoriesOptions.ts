import { Category } from '@/interfaces/service';
import BASE_URL from '@/utils/baseUrl';

const fetchCategoryOptions = async (
  searchTerm?: string
): Promise<Category[]> => {
  const res = await fetch(
    searchTerm
      ? `${BASE_URL}/api/categories?searchTerm=${searchTerm}`
      : `${BASE_URL}/api/categories`,
    {
      mode: 'no-cors',
    }
  ).then((res) => res.json());

  return res.categories;
};

export default fetchCategoryOptions;
