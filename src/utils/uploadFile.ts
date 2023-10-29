import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { storage } from './firebase';

const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export default uploadFile;
