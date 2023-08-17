import Image from 'next/image';
import React from 'react';

type Props = {};

const Feature = (props: Props) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-tertiary text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium leadi">Per ei quaeque sensibus</h4>
        <p className="mt-2">
          Ex usu illum iudico molestie. Pro ne agam facete mediocritatem, ridens
          labore facete mea ei. Pro id apeirian dignissim.
        </p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="">
      <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold tracki text-center sm:text-5xl text-gray-900">
            <span>Why Work</span>
            <span className="text-brand italic font-serif">Inn</span>
            <span>?</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-700">
            Quando cetero his ne, eum admodum sapientem ut.
          </p>
        </div>

        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-2xl font-bold tracki sm:text-3xl text-gray-900">
              Ad vix debet docendi
            </h3>
            <p className="mt-3 text-lg text-gray-700">
              Ne dicta praesent ocurreret has, diam theophrastus at pro. Eos
              etiam regione ut, persius eripuit quo id. Sit te euismod
              tacimates.
            </p>
            <div className="mt-12 space-y-12">
              <Feature />
              <Feature />
              <Feature />
            </div>
          </div>
          <div aria-hidden="true" className="mt-10 lg:mt-0">
            <Image
              src="https://source.unsplash.com/random/360x480"
              alt=""
              height={481}
              width={361}
              className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
