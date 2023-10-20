import { ServiceCategory } from '@/interfaces/service';

const fetchTrendingServiceCategories = async (page = 0): Promise<APIResponse<ServiceCategory[]>> => {
  const res = await fetch(`http://localhost:3000/api/service-categories?category=gzkMNphktJN3HsJLOPny&sub-category=0e7JSDhNAXuHWxLzxjq6&page=${page}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
};

export default fetchTrendingServiceCategories;
