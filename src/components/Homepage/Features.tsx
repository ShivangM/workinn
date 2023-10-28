import features from '@/constants/features';
import Image from 'next/image';
import React from 'react';
import { IconType } from 'react-icons//lib';

type Feature = {
  Icon: IconType;
  name: string;
  description: string;
};

type Props = {
  feature: Feature;
};

const Feature = ({ feature }: Props) => {
  const { Icon, name, description } = feature;
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-secondary text-gray-900">
          <Icon className="w-7 h-7" />
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="mt-2 text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="container p-6 py-12 mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracki text-center sm:text-5xl text-gray-900">
          <span>Why Work</span>
          <span className="text-primary italic font-serif">Inn</span>
          <span>?</span>
        </h2>
        <p className="max-w-3xl mx-auto mt-4 sm:text-xl text-center text-gray-700">
          Embrace the power of AI. Explore seamless task matching, secure UPI
          payments, and transparent blockchain transactions. Elevate your
          freelancing experience today.
        </p>
      </div>

      <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center mt-24">
        <div>
          <div className="space-y-12">
            {features.map((feature, idx) => (
              <Feature feature={feature} key={idx} />
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="mt-10 lg:mt-0">
          <Image
            src="/assets/WhyWorkInn.svg"
            alt=""
            height={500}
            width={500}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
