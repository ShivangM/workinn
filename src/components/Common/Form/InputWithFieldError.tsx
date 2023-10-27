import { ErrorMessage } from '@hookform/error-message';
import React from 'react';

type Props = {
  label: string;
  name: string;
  errors: any;
  children: React.ReactNode;
  labelClassName?: string;
};

const InputWithFieldError = (props: Props) => {
  const { label, name, children, errors, labelClassName } = props;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className={labelClassName || "text-sm font-medium text-gray-700"}>
        {label}
      </label>

      {children}

      <ErrorMessage
        render={({ message }) => (
          <p className="text-red-500 text-xs mt-1">{message}</p>
        )}
        errors={errors}
        name={name}
      />
    </div>
  );
};

export default InputWithFieldError;
