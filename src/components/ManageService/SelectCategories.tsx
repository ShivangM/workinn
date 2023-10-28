import useDefaultOptions from '@/hooks/useDefaultOptions';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputWithFieldError from '../Common/Form/InputWithFieldError';
import AsyncSelect from 'react-select/async';
import { SingleValue } from 'react-select';
import { Category, ServiceCategory, SubCategory } from '@/interfaces/service';
import loadServiceCategoryOptions from '@/utils/loadServiceCategoryOptions';
import loadSubCategoryOptions from '@/utils/loadSubCategoryOptions';
import loadCategoryOptions from '@/utils/loadCategoryOptions';

type Props = {
  category: Category | null;
  subCategory: SubCategory | null;
  serviceCategory: ServiceCategory | null;
};

const SelectCategories = ({
  category,
  serviceCategory,
  subCategory,
}: Props) => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const selectedCategoryId = watch('categoryId');
  const selectedSubCategoryId = watch('subCategoryId');
  const { categoryOptions, serviceCategoryOptions, subCategoryOptions } =
    useDefaultOptions({ selectedCategoryId, selectedSubCategoryId });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Controller
        name="categoryId"
        control={control}
        rules={{ required: 'Category is required' }}
        render={({ field: { onChange, ref } }) => (
          <InputWithFieldError
            label="Category"
            errors={errors}
            name="category"
            labelClassName="text-lg font-medium text-gray-700"
          >
            <AsyncSelect
              ref={ref}
              defaultValue={category}
              isMulti={false}
              onChange={(val: SingleValue<Category>) => onChange(val?.id)}
              loadOptions={loadCategoryOptions}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              defaultOptions={categoryOptions}
            />
          </InputWithFieldError>
        )}
      />

      {selectedCategoryId ? (
        <Controller
          name="subCategoryId"
          control={control}
          rules={{ required: 'Sub Category is required' }}
          render={({ field: { onChange, ref } }) => (
            <InputWithFieldError
              label="Sub Category"
              errors={errors}
              name="subCategory"
              labelClassName="text-lg font-medium text-gray-700"
            >
              <AsyncSelect
                ref={ref}
                defaultValue={subCategory}
                isMulti={false}
                onChange={(val: SingleValue<SubCategory>) => onChange(val?.id)}
                loadOptions={(inputValue) =>
                  loadSubCategoryOptions(selectedCategoryId, inputValue)
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                defaultOptions={subCategoryOptions}
              />
            </InputWithFieldError>
          )}
        />
      ) : null}

      {selectedCategoryId && selectedSubCategoryId ? (
        <Controller
          name="serviceCategoryId"
          control={control}
          rules={{ required: 'Service Category is required' }}
          render={({ field: { onChange, ref } }) => (
            <InputWithFieldError
              label="Service Category"
              errors={errors}
              name="serviceCategory"
              labelClassName="text-lg font-medium text-gray-700"
            >
              <AsyncSelect
                ref={ref}
                defaultValue={serviceCategory}
                isMulti={false}
                onChange={(val: SingleValue<ServiceCategory>) =>
                  onChange(val?.id)
                }
                loadOptions={(inputValue) =>
                  loadServiceCategoryOptions(
                    selectedCategoryId,
                    selectedSubCategoryId,
                    inputValue
                  )
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                defaultOptions={serviceCategoryOptions}
              />
            </InputWithFieldError>
          )}
        />
      ) : null}
    </div>
  );
};

export default SelectCategories;
