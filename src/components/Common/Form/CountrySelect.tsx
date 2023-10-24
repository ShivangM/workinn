import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import InputWithFieldError from './InputWithFieldError'
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';

const CountrySelect = () => {
    const options = useMemo<any>(() => countryList().getData(), []);

    const { control, setValue, formState: { errors } } = useFormContext()

    const changeHandler = (value: any) => {
        setValue('country', value);
    };

    return (
        <Controller
            name="country"
            control={control}
            rules={{ required: 'Country is required' }}
            render={({ field }) => (
                <InputWithFieldError
                    label="Country"
                    errors={errors}
                    name="country"
                >
                    <Select
                        {...field}
                        options={options}
                        value={field.value}
                        onChange={changeHandler}
                    />
                </InputWithFieldError>
            )}
        />
    )
}

export default CountrySelect