import Link from 'next/link';
import React from 'react';

type Props = {};

const CTA = (props: Props) => {
  return (
    <section className="py-6">
      <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
        <h1 className="text-5xl font-bold leadi text-center text-gray-900">
          Get Started?
        </h1>
        <p className="sm:text-xl font-medium text-center text-gray-700">
          At WorkInn, getting started is simple. With intelligent task matching,
          secure UPI payments, and transparent blockchain transactions,
          you&apos;re in control. Join us today and experience the future of
          freelancing.
        </p>
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/services" className="btn">
            Explore Services
          </Link>
          <Link
            href="/"
            className="btnOutline border-brand hover:border-teal-500"
          >
            Become A Seller
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
