'use client';
import { Service } from '@/interfaces/service';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import React from 'react';

type TableRowProps = {
  label: string;
  value: string;
  bold?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({
  label,
  value,
  bold,
}: TableRowProps) => {
  return (
    <tr className="border-b border-opacity-20">
      <td className="p-3 font-semibold">
        <p>{label}</p>
      </td>
      <td className={classNames('p-3', bold ? 'font-bold text-black' : '')}>
        <p>{value}</p>
      </td>
    </tr>
  );
};

type Props = {
  service: Service;
};

const ServiceBrief = ({ service }: Props) => {
  const {
    categoryId,
    id,
    name,
    serviceCategoryId,
    subCategoryId,
    tags,
    sellerWalletAddress,
  } = service;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 p-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
            <span>Service Brief</span>
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
                  <TableRow label="Servie Id" value={id} />
                  <TableRow bold label="Service Name" value={name} />
                  <TableRow label="Category" value={categoryId} />

                  <TableRow
                    label="Service Sub Category"
                    value={subCategoryId}
                  />

                  <TableRow
                    label="Service Category"
                    value={serviceCategoryId}
                  />
                  <TableRow
                    label="Sellers Wallet Address"
                    value={sellerWalletAddress}
                  />
                  <TableRow label="Tags" value={tags.join(', ')} />
                </tbody>
              </table>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ServiceBrief;
