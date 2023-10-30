'use client';
import { ProjectFile } from '@/interfaces/typing';
import uploadFiles, { deleteFile } from '@/utils/uploadFile';
import { Accept, useDropzone } from 'react-dropzone';
import FilePreview from '../Order/FilePreview';

type DropzoneProps = {
  files: ProjectFile[];
  setFiles: React.Dispatch<React.SetStateAction<ProjectFile[]>>;
  maxFiles?: number;
  accept?: Accept;
  deleteAllowed?: boolean;
};

function Dropzone({
  files,
  setFiles,
  maxFiles,
  accept,
  deleteAllowed,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    onDrop: async (acceptedFiles) => {
      const uploadedFiles = await uploadFiles(acceptedFiles);
      setFiles(uploadedFiles);
    },
    maxFiles: maxFiles,
  });

  const removeFile = async (file: ProjectFile) => {
    const newFiles = files.filter((f) => f !== file);
    deleteFile(file.id);
    setFiles(newFiles);
  };

  return (
    <div className="container mx-auto p-4">
      <div
        {...getRootProps({
          className: 'dropzone border-dashed border-2 border-gray-300 p-4',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-center">
          Drag &apos;n&apos; drop some files here (Max 5), or click to select
          files
        </p>
      </div>
      <div className="flex flex-wrap space-x-4 mt-4">
        {files.map((file) => (
          <FilePreview
            key={file.id}
            file={file}
            deleteAllowed
            removeFile={removeFile}
          />
        ))}
      </div>
    </div>
  );
}

export default Dropzone;
