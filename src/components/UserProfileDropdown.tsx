'use client';
import Image from 'next/image';
import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import { IconType } from 'react-icons/lib';
import { FaCog, FaUser } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { RiPagesLine, RiBillLine } from 'react-icons/ri';

type Option = {
  href: string;
  Icon: IconType;
  name: string;
  color: string;
};

const options: Option[] = [
  {
    href: '/profile',
    Icon: FaUser,
    name: 'Profile',
    color: 'teal',
  },
  {
    href: '/dashboard',
    Icon: RxDashboard,
    name: 'Dashboard',
    color: 'orange',
  },
  {
    href: '/post-request',
    Icon: RiPagesLine,
    name: 'Post a Request',
    color: 'brand',
  },
  {
    href: '/settings',
    Icon: FaCog,
    name: 'Settings',
    color: 'brand',
  },
  {
    href: '/billings-payments',
    Icon: RiBillLine,
    name: 'Billing & Payments',
    color: 'brand',
  },
  {
    href: '/refer-friend',
    Icon: AiOutlineTeam,
    name: 'Refer a Friend',
    color: 'brand',
  },
  {
    href: '/help-support',
    Icon: BiHelpCircle,
    name: 'Help & Support',
    color: 'brand',
  },
];

const UserProfileDropdownOption = ({ option }: { option: Option }) => {
  const { Icon, color, href, name } = option;
  return (
    <li className="font-medium text-sm">
      <Link
        href={href}
        className={`flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-${color}-500`}
      >
        <div className="mr-3">
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        {name}
      </Link>
    </li>
  );
};

const UserProfileDropdown = () => {
  const [logout, userData] = useUserStore((state) => [
    state.logout,
    state.userData,
  ]);

  const [show, setShow] = useState<boolean>(false);

  return (
    <div
      onMouseLeave={() => setShow(false)}
      className="flex justify-center items-center text-gray-900"
    >
      <div
        className={classNames(
          'relative border-b-4 border-transparent py-3',
          'border-brand transform transition duration-300'
        )}
        onMouseEnter={() => setShow(true)}
      >
        <div className="flex space-x-2 px-4 cursor-pointer items-center">
          <Image
            alt={userData?.displayName!}
            src={userData?.photoURL || '/assets/Dummy Profile.png'}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm line-clamp-1 font-semibold">
              {userData?.displayName!}
            </span>
            <span className="text-xs line-clamp-1 text-gray-500">
              {userData?.email!}
            </span>
          </div>
        </div>

        {show ? (
          <div className="absolute w-60 px-5 py-3 pb-4 bg-white rounded-lg shadow border mt-5 right-0">
            <ul className="space-y-5">
              {options.map((option, idx) => (
                <UserProfileDropdownOption option={option} key={idx} />
              ))}

              <hr className="" />

              <li className="font-medium text-sm">
                <button
                  onClick={logout}
                  className="flex items-center transform transition-colors duration-200 border-r-4 w-full border-transparent hover:border-red-600"
                >
                  <div className="mr-3 text-red-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </div>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfileDropdown;
