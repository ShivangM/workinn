import { ExtendedFile } from '@/interfaces/typing';

const fileTypeMap: { [key: string]: string } = {
  image: '/assets/images/jpg.svg',
  video: '/assets/images/video.svg',
  audio: '/assets/images/audio.svg',
  text: '/assets/images/text.svg',
  'application/pdf': '/assets/images/pdf.svg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    '/assets/images/word.svg',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    '/assets/images/xls.svg',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    '/assets/images/ppt.svg',
  'application/zip': '/assets/images/zip.svg',
};

const getFileThumbnail = (file: ExtendedFile) => {
  const { type } = file;
  for (const key in fileTypeMap) {
    if (type.startsWith(key)) {
      return fileTypeMap[key];
    }
  }

  return '/assets/images/file.svg';
};

export { fileTypeMap };
export default getFileThumbnail;
