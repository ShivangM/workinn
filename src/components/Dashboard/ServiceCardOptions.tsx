'use client';
import { Service } from '@/interfaces/service';
import useDashboardStore from '@/store/dashboardStore';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillPauseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePauseCircle,
} from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ServiceCardOptions({ service }: { service: Service }) {
  const router = useRouter();
  const [toggleDeleteServiceModal, toggleServiceStatusModal] =
    useDashboardStore((state) => [
      state.toggleDeleteServiceModal,
      state.toggleServiceStatusModal,
    ]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 p-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <BsThreeDotsVertical className="h-5 w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push(`/manage-service/${service.id}`)}
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <AiFillEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <AiOutlineEdit
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => toggleServiceStatusModal(service)}
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <AiFillPauseCircle
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <AiOutlinePauseCircle
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  {service.isPaused ? 'Unpause' : 'Pause'}
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => toggleDeleteServiceModal(service)}
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <AiFillDelete className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <AiOutlineDelete
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/services/${service.id}`}
                  rel="noreffer"
                  target="_blank"
                  className={`${
                    active ? 'bg-primary text-white' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                >
                  {active ? (
                    <AiFillEye className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <AiOutlineEye className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  View Service
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
