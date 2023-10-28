import React from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  title: string;
  value: string;
  Icon: IconType;
};

const BasicDetailProperty = ({ title, value, Icon }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Icon />
        <span>{title}</span>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
};

export default BasicDetailProperty;
