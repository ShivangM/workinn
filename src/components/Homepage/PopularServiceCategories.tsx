'use client';
import { ServiceCategory } from '@/interfaces/service';
import getImageFromUnsplash from '@/utils/getImageFromUnsplash';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type Props = {
  serviceCategories: ServiceCategory[];
};

const ServiceCategoryCard = ({
  serviceCategory,
}: {
  serviceCategory: ServiceCategory;
}) => {
  const { name, description, image, id, categoryId, subCategoryId } =
    serviceCategory;

  return (
    <Link
      href={`/categories/${categoryId}/${subCategoryId}/${id}`}
      className="relative group flex items-end overflow-hidden justify-start min-w-[300px] text-left bg-center bg-cover h-96"
    >
      <Image
        src={image || getImageFromUnsplash(name)}
        alt={name}
        fill
        className="z-0 group-hover:scale-105 transition-all ease-in-out duration-300"
        style={{ objectFit: 'cover' }}
      />

      <div className="absolute z-10 top-0 bottom-0 left-0 right-0 bg-gradient-to-b via-transparent from-gray-900 to-gray-900"></div>
      <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
        <p className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-gray-100">
          POPULAR SERVICE CATEGORY
        </p>

        {/* <div className="flex flex-col justify-start text-left text-gray-100">
          <span className="text-xl sm:text-2xl xl:text-3xl font-semibold leading-none tracking-wide">
            20+
          </span>
          <span className="leading-none uppercase">SERVICES</span>
        </div> */}
      </div>
      <div className="z-10 p-5">
        <h2 className="">
          <span className="font-semibold text-2xl hover:underline text-gray-100">
            {name}
          </span>
        </h2>
        <h4 className="">
          <span className="font-md text-md line-clamp-1 hover:underline text-gray-400">
            {description}
          </span>
        </h4>
      </div>
    </Link>
  );
};

const PopularServiceCategories = ({ serviceCategories }: Props) => {
  const scrollRef = useRef<HTMLDivElement>();

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 800, behavior: 'smooth' });
  };

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -800, behavior: 'smooth' });
  };

  return (
    <section
      id="popular-services"
      className="container mx-auto flex flex-col items-center justify-center relative space-y-8 p-6 py-12"
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold tracki text-center sm:text-3xl text-gray-900">
          POPULAR SERVICE CATEGORIES
        </h1>

        <div className="flex items-center space-x-2">
          <button
            title="previous"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
            onClick={handleScrollLeft}
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            title="next"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
            onClick={handleScrollRight}
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef as any}
        className="flex gap-5 w-full overflow-x-auto scrollbar-none"
      >
        {serviceCategories.map((serviceCategory, idx) => {
          return (
            <ServiceCategoryCard serviceCategory={serviceCategory} key={idx} />
          );
        })}
      </div>
    </section>
  );
};

export default PopularServiceCategories;
