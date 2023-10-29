import { SellerBrief } from '@/interfaces/order';
import React from 'react';
import Milestone from './Milestone';

type Props = {
  sellerBrief: SellerBrief;
};

const SellersBrief = ({ sellerBrief }: Props) => {
  const { milestones, summary } = sellerBrief;
  const decodedSummary = decodeURIComponent(summary);

  return (
    <div className='className="text-gray-600 space-y-6'>
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Summary</h3>
        <div
          className="space-y-4 text-sm"
          dangerouslySetInnerHTML={{ __html: decodedSummary }}
        />
      </div>

      <div className="flex flex-col space-y-4 divide-y-2">
        <h3 className="font-semibold text-gray-900">Milestones</h3>

        {milestones.map((milestone, index) => (
          <Milestone key={index} milestones={milestone} />
        ))}
      </div>
    </div>
  );
};

export default SellersBrief;
