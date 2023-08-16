import { Service } from '@/interfaces/service';
import db from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchTrendingServices = async (): Promise<Service[]> => {
  const servicesRef = collection(db, 'services');
  const servicesSnapshot = await getDocs(servicesRef);
  const services = servicesSnapshot.docs.map((doc) => doc.data());
  return services as Service[];
};

export default fetchTrendingServices;
