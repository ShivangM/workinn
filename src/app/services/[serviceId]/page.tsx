import Breadcrumb from '@/components/Common/Breadcrumb';
import AboutSeller from '@/components/ServicePage/AboutSeller';
import BuyService from '@/components/ServicePage/BuyService';
import ImageGallery from '@/components/ServicePage/ImageGallery';
import Ratings from '@/components/ServicePage/Ratings';
import ServiceFaqs from '@/components/ServicePage/ServiceFaqs';
import UserReviews from '@/components/ServicePage/UserReviews';
import { Service } from '@/interfaces/service';
import { BreadcrumLink } from '@/interfaces/typing';
import fetchUserData from '@/lib/profile/fetchUserData';
import fetchCategory from '@/lib/services/category/fetchCategory';
import fetchServiceCategory from '@/lib/services/service-category/fetchServiceCategory';
import fetchService from '@/lib/services/service/fetchService';
import fetchSubCategory from '@/lib/services/sub-category/fetchSubCategory';
import React from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';

type Props = {
  params: {
    serviceId: string;
  };
};

const page = async ({ params: { serviceId } }: Props) => {
  let service: Service | null = null;
  try {
    const { data } = await fetchService(serviceId);
    service = data;
  } catch (error) {
    console.error(error);
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  const { categoryId, subCategoryId, serviceCategoryId } = service;

  const { data: category } = await fetchCategory(categoryId);
  const { data: subCategory } = await fetchSubCategory(
    categoryId,
    subCategoryId
  );
  const { data: serviceCategory } = await fetchServiceCategory(
    categoryId,
    subCategoryId,
    serviceCategoryId
  );

  const path: BreadcrumLink[] = [
    {
      name: 'Categories',
      link: '/categories',
    },
    {
      name: category.name,
      link: `/categories/${categoryId}`,
    },
    {
      name: subCategory.name,
      link: `/categories/${categoryId}`,
    },
    {
      name: serviceCategory.name,
      link: `/categories/${categoryId}/${subCategoryId}/${serviceCategoryId}}`,
    },
    {
      name: service.name,
    },
  ];

  const { name, images, description, faqs, ownerId } = service;

  const { data: userData } = await fetchUserData(ownerId);
  const decodedDescription = decodeURIComponent(description);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Breadcrumb path={path} />
        <div className="flex items-center space-x-2 text-gray-500 ">
          <MdFavoriteBorder className="h-5 aspect-square" />
          <AiOutlineShareAlt className="h-5 aspect-square" />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-10 relative">
        <div className="col-span-4 space-y-8 divide-y">
          <h1 className="text-4xl font-bold">{name}</h1>
          {/* @ts-ignore  */}
          <ImageGallery images={images} />
          <div className="space-y-2 pt-6">
            <h2 className="text-2xl font-bold">Description</h2>
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: decodedDescription }}
            />
          </div>

          <div className="space-y-2 pt-6">
            <h2 className="text-2xl font-bold">Tags</h2>
            <div className="space-x-2 py-4">
              {service.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-6">
            <h2 className="text-2xl font-bold">FAQs</h2>
            <ServiceFaqs faqs={faqs} />
          </div>

          <div className="space-y-2 pt-6">
            <h2 className="text-2xl font-bold">Ratings</h2>
            <Ratings />
          </div>

          <div className="space-y-2 pt-6">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <UserReviews />
          </div>
        </div>

        <div className="space-y-8 sticky top-28 col-span-2 z-10">
          <BuyService service={service} />
          {userData ? <AboutSeller userData={userData} /> : null}
        </div>
      </div>
    </div>
  );
};

export default page;
