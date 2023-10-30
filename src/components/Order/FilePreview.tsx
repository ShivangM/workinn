import { ProjectFile } from '@/interfaces/typing';
import fileTypeMap from '@/utils/getFileThumbnail';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TiDelete } from 'react-icons/ti';

type Props = {
  file: ProjectFile;
  removeFile: (file: ProjectFile) => void;
};

const FilePreview = ({ file, removeFile }: Props) => {
  return (
    <div className="flex flex-col relative items-start justify-center space-y-2">
      <button
        className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
        onClick={() => removeFile(file)}
      >
        <TiDelete className="h-4 w-4" />
      </button>

      <Image
        src={file.type.startsWith('image') ? file.url : fileTypeMap[file.type]}
        alt={file.name}
        width={60}
        height={60}
      />
      <Link
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold hover:underline"
      >
        {file.name}
      </Link>
    </div>
  );
};

export default FilePreview;
