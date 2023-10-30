'use client';
import { SellerBrief } from '@/interfaces/order';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';
import Milestone from './Milestone';

type Props = {
  sellerBrief: SellerBrief;
};

const SellersBrief = ({ sellerBrief }: Props) => {
  const { milestones, summary } = sellerBrief;
  const decodedSummary = decodeURIComponent(summary);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 p-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
            <span>Sellers Brief</span>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-gray-900`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-600 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Summary</h3>
              <div
                className="space-y-4 text-sm"
                dangerouslySetInnerHTML={{ __html: decodedSummary }}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-lg text-gray-900">Milestones</h3>

              <div className="space-y-8 divide-y-2">
                {milestones.map((milestone, index) => (
                  <div key={index} className="">
                    <h3 className="font-semibold pt-4 text-gray-900">
                      Milestones {index + 1}
                    </h3>

                    <Milestone milestones={milestone} />
                  </div>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default SellersBrief;
