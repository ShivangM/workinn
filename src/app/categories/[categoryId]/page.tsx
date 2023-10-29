import Banner from '@/components/Categories/CategoryPage/Banner';
import SubCategories from '@/components/Categories/CategoryPage/SubCategories';
import FAQs from '@/components/Categories/CategoryPage/FAQs';
import fetchCategory from '@/lib/services/category/fetchCategory';
import React from 'react';
import Breadcrumb from '@/components/Common/Breadcrumb';
import fetchSubCategories from '@/lib/services/sub-category/fetchSubCategories';
import { BreadcrumLink } from '@/interfaces/typing';

type Props = {
  params: {
    categoryId: string;
  };
};

export const revalidate = 60 * 60 * 24; // 24 hours

const page = async ({ params: { categoryId } }: Props) => {
  const { data: category } = await fetchCategory(categoryId);
  const { data: subCategories } = await fetchSubCategories(categoryId);

  const path: BreadcrumLink[] = [
    {
      name: 'Categories',
      link: '/categories',
    },
    {
      name: category.name,
    },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumb path={path} />
      <div className="space-y-20">
        <Banner name={category.name} description={category.description} />
        <SubCategories subCategories={subCategories} />
        <FAQs faqs={category.faqs} />
      </div>
    </div>
  );
};

export default page;
