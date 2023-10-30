'use client';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import { BuyerBrief } from '@/interfaces/order.d';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import FilePreview from './FilePreview';
import TableRow from './TableRow';

type BuyersBriefProps = {
  buyerBrief: BuyerBrief;
};

const BuyersBrief = ({ buyerBrief }: BuyersBriefProps) => {
  const { convertInrToETH, convertInrToUSD } = useCurrencyConversion();
  const {
    projectBudget,
    projectDeadline,
    projectDescription,
    projectFiles,
    projectTitle,
  } = buyerBrief;

  const decodedDescription = decodeURIComponent(projectDescription);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 p-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
            <span>Buyers Brief</span>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-gray-900`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-600 space-y-6">
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
                  <TableRow label="Project Title" value={projectTitle} />
                  <TableRow
                    label="Project Budget In Rupees"
                    value={`₹${projectBudget}`}
                    bold
                  />
                  <TableRow
                    label="Project Budget In USD"
                    value={`₹${convertInrToUSD(projectBudget)}`}
                  />
                  <TableRow
                    label="Project Budget In ETH"
                    value={`₹${convertInrToETH(projectBudget)}`}
                  />
                  <TableRow
                    bold
                    label="Project Deadline"
                    value={projectDeadline}
                  />
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                Project Description
              </h3>
              <div
                className="space-y-4 text-sm"
                dangerouslySetInnerHTML={{ __html: decodedDescription }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Project Files</h3>

              <div className="flex items-center space-x-4">
                {projectFiles && projectFiles.length > 0 ? (
                  projectFiles.map((file, index) => (
                    <FilePreview file={file} key={index} />
                  ))
                ) : (
                  <span className="text-sm font-semibold">
                    No files uploaded
                  </span>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default BuyersBrief;
