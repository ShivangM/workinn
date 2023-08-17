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
        <p className="text-xl font-medium text-center text-gray-700">
          At a assumenda quas cum earum ut itaque commodi saepe rem aspernatur
          quam natus quis nihil quod, hic explicabo doloribus magnam neque,
          exercitationem eius sunt!
        </p>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
          <Link href="/services" className="btn">
            Explore Services
          </Link>
          <Link href="/" className="btn">
            Become A Freelancer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
