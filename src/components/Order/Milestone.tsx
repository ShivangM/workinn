'use client';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import { Milestone } from '@/interfaces/order';
import React from 'react';
import FilePreview from './FilePreview';
import TableRow from './TableRow';

type Props = {
  milestones: Milestone;
};

const Milestone = ({ milestones }: Props) => {
  const {
    amount,
    completedAt,
    deadline,
    description,
    files,
    paidAt,
    status,
    title,
  } = milestones;

  const { convertInrToETH, convertInrToUSD } = useCurrencyConversion();

  return (
    <div className="text-gray-600 pt-4 space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col span={1} className="col1" />
            <col span={3} className="col3" />
          </colgroup>
          <thead className="">
            <tr className="text-left">
              <th className="p-3" colSpan={1}>
                Detail
              </th>
              <th className="p-3" colSpan={1}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRow bold label="Milestone Title" value={title} />
            <TableRow label="Amount In Rupees" value={`₹${amount}`} bold />
            <TableRow
              label="Amount In USD"
              value={`₹${convertInrToUSD(amount)}`}
              bold
            />
            <TableRow
              label="Amount In ETH"
              value={`₹${convertInrToETH(amount)}`}
              bold
            />
            <TableRow bold label="Milestone Deadline" value={deadline} />
            <TableRow label="Milestone Status" value={status} />
            {completedAt && (
              <TableRow label="Milestone Completed At" value={completedAt} />
            )}
            {paidAt && <TableRow label="Milestone Paid At" value={paidAt} />}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Milestone Description</h3>
        <div
          className="space-y-4 text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Milestone Files</h3>

        <div className="grid grid-cols-4 gap-4">
          {files && files.length > 0 ? (
            files.map((file, index) => <FilePreview file={file} key={index} />)
          ) : (
            <span className="text-sm font-semibold">No files uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Milestone;
