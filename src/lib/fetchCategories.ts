import { Category } from '@/interfaces/service';

const fetchCategories = async (page = 1): Promise<APIResponse<Category[]>> => {
    const res = await fetch(`http://localhost:3000/api/categories?page=${page - 1}`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
};

export default fetchCategories;
