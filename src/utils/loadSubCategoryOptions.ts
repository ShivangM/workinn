import { SubCategory } from '@/interfaces/service';
import debounce from './debounce';
import fetchSubCategoryOptions from '@/lib/services/sub-category/fetchSubCategoriesOptions';

const promiseSubCategoryOptions = async (
  categoryId: string,
  callback: (res: SubCategory[]) => void,
  inputValue?: string
) => {
  try {
    const res = await fetchSubCategoryOptions(categoryId, inputValue);
    callback(res);
  } catch (error) {
    // Todo: Handle error appropriately, e.g., log the error or show a user-friendly message
    console.error('Error fetching sub categories options:', error);
  }
};

const loadSubCategoryOptions = async (
  categoryId: string,
  inputValue?: string
) => {
  try {
    return await new Promise<SubCategory[]>((resolve) => {
      const debouncedPromise = debounce(async () => {
        await promiseSubCategoryOptions(
          categoryId,
          (res) => {
            resolve(res);
          },
          inputValue
        );
      }, 300);
      debouncedPromise();
    });
  } catch (error) {
    // Todo: Handle error appropriately, e.g., log the error or show a user-friendly message
    console.error('Error loading sub categories options:', error);
    return [];
  }
};

export default loadSubCategoryOptions;
