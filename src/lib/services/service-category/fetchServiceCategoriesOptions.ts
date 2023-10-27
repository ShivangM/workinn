import { ServiceCategory } from '@/interfaces/service';
import BASE_URL from '@/utils/baseUrl';

const fetchServiceCategoriesOptions = async (
    categoryId: string,
    subCategoryId: string,
    searchTerm?: string,
): Promise<ServiceCategory[]> => {
    const res = await fetch(searchTerm ? `${BASE_URL}/api/service-categories?categoryId=${categoryId}&subCategoryId=${subCategoryId}&searchTerm=${searchTerm}` :
        `${BASE_URL}/api/service-categories?categoryId=${categoryId}&subCategoryId=${subCategoryId}`, {
        mode: "no-cors"
    }).then((res) => res.json());

    return res.serviceCategories;
};

export default fetchServiceCategoriesOptions;
