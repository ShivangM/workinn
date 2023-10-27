import React, { useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Control, useController } from 'react-hook-form';

type DropzoneProps = {
    control: Control<any, any>;
    name: string;
};

type ExtendedFile = FileWithPath & {
    preview: string;
};

function Dropzone({ control, name }: DropzoneProps) {
    const {
        field: { onChange },
    } = useController({ name, control });

    const [files, setFiles] = useState<ExtendedFile[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.png', '.gif', '.jpg', '.jpeg']
        },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
            );
            onChange(acceptedFiles);
        },
        maxFiles: 5,
    });

    const thumbs = files.map((file) => (
        <div className="inline-flex border border-gray-300 rounded m-1 p-1" key={file.name}>
            <div className="flex h-20 aspect-auto flex-1 min-w-0 overflow-hidden">
                <img
                    src={file.preview}
                    className="block w-auto h-full"
                    // Revoke data URI after the image is loaded
                    onLoad={() => {
                        if (file.preview) URL.revokeObjectURL(file.preview);
                    }}
                    alt="uploaded"
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data URIs to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => {
            if (file.preview) URL.revokeObjectURL(file.preview);
        });
    }, [files]);

    return (
        <div className="container mx-auto p-4">
            <div {...getRootProps({ className: 'dropzone border-dashed border-2 border-gray-300 p-4' })}>
                <input {...getInputProps()} />
                <p className="text-center">Drag 'n' drop some files here (Max 5), or click to select files</p>
            </div>
            <div className="flex flex-wrap mt-4">{thumbs}</div>
        </div>
    );
}

export default Dropzone;
