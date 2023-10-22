import React from 'react';

type Props = {
  onConfirm: () => void;
  title: string;
  loading: boolean;
};

const ModalConfirmButton = ({ onConfirm, title, loading }: Props) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onConfirm}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default ModalConfirmButton;
