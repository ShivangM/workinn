import React from 'react';

type Props = {
  onReject: () => void;
  title: string;
  loading: boolean;
};

const ModalRejectButton = ({ onReject, title, loading }: Props) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onReject}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default ModalRejectButton;
