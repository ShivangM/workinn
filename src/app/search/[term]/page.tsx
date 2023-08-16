import React from 'react';

type Props = {
  params: {
    term: string;
  };
};

const page = ({ params: { term } }: Props) => {
  return <div>{term}</div>;
};

export default page;
