import { ProjectFile } from '@/interfaces/typing';
import { Timestamp } from 'firebase/firestore';
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

const uploadFile = async (file: File, path?: string): Promise<ProjectFile> => {
  const id = Timestamp.now().toMillis();
  const name = file.name;
  const fileId = `${id}-${name}`;
  const fileRef = ref(storage, path || `files/${fileId}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  const projectFile: ProjectFile = {
    id: fileId,
    name: file.name,
    url,
    fileType: file.type,
  };

  return projectFile;
};

const deleteFile = async (id: string, path?: string): Promise<void> => {
  const fileRef = ref(storage, path || `files/${id}`);
  await deleteObject(fileRef);
};

const uploadFiles = async (
  files: File[],
  path?: string
): Promise<ProjectFile[]> => {
  const projectFiles: ProjectFile[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const projectFile = await uploadFile(file, path);
    projectFiles.push(projectFile);
  }

  return projectFiles;
};

export { uploadFile, deleteFile };
export default uploadFiles;
