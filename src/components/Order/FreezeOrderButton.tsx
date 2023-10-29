import React from 'react';

type Props = {};

const FreezeOrderButton = (props: Props) => {
  return (
    <button className="px-5 py-2.5 w-full font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm">
      Freeze
    </button>
  );
};

export default FreezeOrderButton;
