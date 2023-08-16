import React from 'react';

type Props = {
  params: {
    service: string;
  };
};

const page = ({ params: { service } }: Props) => {
  return <div>{service}</div>;
};

export default page;
