import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputWithFieldError from '../Common/Form/InputWithFieldError';

const AddPrice = () => {
  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useFormContext();

  const price = watch('price');
  const { convertInrToETH, convertInrToUSD } = useCurrencyConversion();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Controller
        name="price"
        control={control}
        rules={{ required: 'Base Price is required' }}
        render={() => (
          <InputWithFieldError
            label="Price in Rs."
            errors={errors}
            name="price"
            labelClassName="text-lg font-medium text-gray-700"
          >
            <input
              type="number"
              className="form-input placeholder:gray-400"
              placeholder="Price"
              {...register('price', {
                required: 'Base Price is required',
                min: {
                  value: 100,
                  message: 'Base Price cannot be less than 100',
                },
              })}
            />
          </InputWithFieldError>
        )}
      />

      <InputWithFieldError
        label="International Price in $"
        errors={errors}
        name="internationalPrice"
        labelClassName="text-lg font-medium text-gray-700"
      >
        <input
          type="number"
          disabled
          className="form-input placeholder:gray-400"
          placeholder="Price"
          value={convertInrToUSD(price)}
        />
      </InputWithFieldError>

      <InputWithFieldError
        label="Crypto Price in ETH"
        errors={errors}
        name="cryptoPrice"
        labelClassName="text-lg font-medium text-gray-700"
      >
        <input
          type="number"
          disabled
          className="form-input placeholder:gray-400"
          placeholder="Price"
          value={convertInrToETH(price)}
        />
      </InputWithFieldError>
    </div>
  );
};

export default AddPrice;
