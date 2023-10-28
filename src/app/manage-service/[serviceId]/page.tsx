import AddServiceForm from '@/components/ManageService/AddServiceForm';
import AddServiceInstrucations from '@/components/ManageService/AddServiceInstrucations';
import {
  Category,
  Service,
  ServiceCategory,
  SubCategory,
} from '@/interfaces/service';
import fetchCategory from '@/lib/services/category/fetchCategory';
import fetchServiceCategory from '@/lib/services/service-category/fetchServiceCategory';
import fetchService from '@/lib/services/service/fetchService';
import fetchSubCategory from '@/lib/services/sub-category/fetchSubCategory';
import React from 'react';

type Props = {
  params: {
    serviceId: string;
  };
};

const page = async ({ params: { serviceId } }: Props) => {
  let service: Service | null = null;
  let category: Category | null = null;
  let subCategory: SubCategory | null = null;
  let serviceCategory: ServiceCategory | null = null;

  try {
    const { data } = await fetchService(serviceId);
    service = data;
    const { categoryId, subCategoryId, serviceCategoryId } = data;
    const { data: categoryData } = await fetchCategory(categoryId);
    const { data: subCategoryData } = await fetchSubCategory(
      categoryId,
      subCategoryId
    );
    const { data: serviceCategoryData } = await fetchServiceCategory(
      categoryId,
      subCategoryId,
      serviceCategoryId
    );

    category = categoryData;
    subCategory = subCategoryData;
    serviceCategory = serviceCategoryData;
  } catch (error) {
    console.error(error);
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="flex min-h-screen space-x-8">
      <AddServiceInstrucations />
      <AddServiceForm
        service={service}
        category={category}
        subCategory={subCategory}
        serviceCategory={serviceCategory}
      />
    </div>
  );
};

export default page;
