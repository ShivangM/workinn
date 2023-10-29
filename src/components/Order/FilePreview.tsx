import { ProjectFile } from '@/interfaces/order';
import { fileTypeMap } from '@/utils/getFileThumbnail';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  file: ProjectFile;
};

const FilePreview = ({ file }: Props) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-start space-y-2"
    >
      <Image
        src={fileTypeMap[file.type]}
        alt={file.name}
        width={60}
        height={60}
      />
      <span className="text-sm font-semibold">{file.name}</span>
    </Link>
  );
};

export default FilePreview;
