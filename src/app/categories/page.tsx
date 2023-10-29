import CategoryCard from '@/components/Categories/CategoryCard';
import Breadcrumb from '@/components/Common/Breadcrumb';
import Pagination from '@/components/Common/Pagination';
import { BreadcrumLink } from '@/interfaces/typing';
import fetchCategories from '@/lib/services/category/fetchCategories';
import React from 'react';

type Props = {
  searchParams: {
    page: string | undefined;
  };
};

const path: BreadcrumLink[] = [
  {
    name: 'Categories',
  },
];

export const revalidate = 60 * 60 * 24; // 24 hours

const page = async ({ searchParams: { page } }: Props) => {
  const {
    data: categories,
    pageTotal,
    total,
  } = await fetchCategories(parseInt(page || '1'));

  return (
    <div className="space-y-8">
      <Breadcrumb path={path} />

      <div className="">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          Explore Categories ({total})
        </h1>
        <p className="text-sm sm:text-base md:text-lg xl:text-xl font-medium text-gray-500 mt-1 sm:mt-2">
          Browse through our categories to find the service you need
        </p>
      </div>

      <hr className="border-gray-300 w-full" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-10">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center w-full">
            <h2 className="text-xl font-semibold">No categories found</h2>
          </div>
        )}
      </div>

      <Pagination
        pages={pageTotal}
        activePage={parseInt(page || '1')}
        baseUrl="/categories"
      />
    </div>
  );
};

export default page;
