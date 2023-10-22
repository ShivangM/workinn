import classNames from 'classnames';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

type Props = {
  setImage: (file: File | null) => void;
  previewImage?: string;
};

const ImagePicker = ({ setImage, previewImage }: Props) => {
  // Image Upload and Preview
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleReset = () => {
    setImage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0];
      setImage(file);
    }
  };

  // drag state
  const [dragActive, setDragActive] = useState(false);

  // handle drag events
  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setImage(file);
    }
  };

  return (
    <div className="">
      <input hidden onChange={handleChange} ref={imageRef} type="file" />

      <div
        onPaste={handlePaste}
        onDragEnter={handleDrag}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={classNames(
          'border-2 space-y-3 rounded-md border-dashed p-4 flex flex-col items-center justify-center focus:border-gray-600 transition-all ease-in-out duration-300',
          dragActive ? 'border-brand' : 'border-gray-500'
        )}
      >
        <Image
          src={previewImage || '/assets/image-placeholder.svg'}
          onClick={() => imageRef?.current?.click()}
          alt="Upload Image"
          width={500}
          height={288}
          className="object-cover cursor-pointer object-center w-full rounded-md"
        />
        <p className="text-sm text-gray-900">
          Add image by selecting, or paste it.
        </p>
        <button type="button" onClick={handleReset} className="btn text-sm">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
