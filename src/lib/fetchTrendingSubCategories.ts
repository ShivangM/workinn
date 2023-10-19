import { SubCategory } from '@/interfaces/service';
import db from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchTrendingSubCategories = async (): Promise<SubCategory[]> => {
  const subCategoriesRef = collection(db, 'services');
  const subCategoriesSnapshot = await getDocs(subCategoriesRef);
  const subCategories = subCategoriesSnapshot.docs.map((doc) => doc.data());
  return subCategories as SubCategory[];
};

export default fetchTrendingSubCategories;
