import ReadMorePara from '@/components/Common/ReadMorePara';
import { FAQ } from '@/interfaces/typing';
import React from 'react';

type Props = {
  faqs: FAQ[];
};

const FAQ = ({ question, answer }: FAQ) => {
  return (
    <div className="mb-10 cursor-pointer">
      <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
        <svg
          className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {question}
      </h3>
      <ReadMorePara lines={3} className="text-gray-500 text-sm">
        {answer}
      </ReadMorePara>
    </div>
  );
};

const FAQs = ({ faqs }: Props) => {
  return (
    <section className="">
      <h2 className="mb-8 text-2xl sm:text-3xl tracking-tight font-bold">
        Frequently asked questions
      </h2>
      <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
        {faqs.map((faq, id) => (
          <FAQ key={id} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQs;
