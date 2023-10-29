import { ExtendedFile } from '@/interfaces/typing';

const getFileThumbnail = (file: ExtendedFile) => {
  const { type } = file;

  const fileTypeMap: { [key: string]: string } = {
    image: file.preview || '/assets/images/jpg.svg',
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

  for (const key in fileTypeMap) {
    if (type.startsWith(key)) {
      return fileTypeMap[key];
    }
  }

  return '/assets/images/file.svg';
};

export default getFileThumbnail;
