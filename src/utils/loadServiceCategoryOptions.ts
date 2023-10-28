import { ServiceCategory } from '@/interfaces/service';
import debounce from './debounce';
import fetchServiceCategoriesOptions from '@/lib/services/service-category/fetchServiceCategoriesOptions';

const promiseServiceCategoryOptions = async (
  categoryId: string,
  subCategoryId: string,
  callback: (res: ServiceCategory[]) => void,
  inputValue?: string
) => {
  try {
    const res = await fetchServiceCategoriesOptions(
      categoryId,
      subCategoryId,
      inputValue
    );
    callback(res);
  } catch (error) {
    // Todo: Handle error appropriately, e.g., log the error or show a user-friendly message
    console.error('Error fetching service categories options:', error);
  }
};

const loadServiceCategoryOptions = async (
  categoryId: string,
  subCategoryId: string,
  inputValue?: string
) => {
  try {
    return await new Promise<ServiceCategory[]>((resolve) => {
      const debouncedPromise = debounce(async () => {
        await promiseServiceCategoryOptions(
          categoryId,
          subCategoryId,
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
    console.error('Error loading service categories options:', error);
    return [];
  }
};

export default loadServiceCategoryOptions;
