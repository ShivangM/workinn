import { Category, ServiceCategory, SubCategory } from '@/interfaces/service';
import loadCategoryOptions from '@/utils/loadCategoryOptions';
import loadServiceCategoryOptions from '@/utils/loadServiceCategoryOptions';
import loadSubCategoryOptions from '@/utils/loadSubCategoryOptions';
import { useEffect, useState } from 'react';

type Props = {
  selectedCategoryId: string | null;
  selectedSubCategoryId: string | null;
};

const useDefaultOptions = ({
  selectedCategoryId,
  selectedSubCategoryId,
}: Props) => {
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>(
    []
  );
  const [serviceCategoryOptions, setServiceCategoryOptions] = useState<
    ServiceCategory[]
  >([]);

  useEffect(() => {
    loadCategoryOptions().then((options) => {
      setCategoryOptions(options);
    });
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      loadSubCategoryOptions(selectedCategoryId).then((options) => {
        setSubCategoryOptions(options);
      });
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (selectedCategoryId && selectedSubCategoryId) {
      loadServiceCategoryOptions(
        selectedCategoryId,
        selectedSubCategoryId
      ).then((options) => {
        setServiceCategoryOptions(options);
      });
    }
  }, [selectedCategoryId, selectedSubCategoryId]);

  return {
    categoryOptions,
    subCategoryOptions,
    serviceCategoryOptions,
  };
};

export default useDefaultOptions;
