'use client';
import Image from 'next/image';
import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import { IconType } from 'react-icons/lib';
import { FaCog, FaUser } from 'react-icons/fa';

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
    color: 'brand',
  },
  {
    href: '/profile/settings',
    Icon: FaCog,
    name: 'Settings',
    color: 'brand',
  },
];

const UserProfileDropdownOption = ({ option }: { option: Option }) => {
  const { Icon, color, href, name } = option;
  return (
    <li className="font-medium">
      <Link
        href={href}
        className={`flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-${color}`}
      >
        <div className="mr-3">
          <Icon className={`w-6 h-6 text-${color}`} />
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
          <div className="absolute w-60 px-5 py-3 bg-white rounded-lg shadow border mt-5 right-0">
            <ul className="space-y-3">
              {options.map((option, idx) => (
                <UserProfileDropdownOption option={option} key={idx} />
              ))}

              <hr className="" />

              <li className="font-medium">
                <button
                  onClick={logout}
                  className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                >
                  <div className="mr-3 text-red-600">
                    <svg
                      className="w-6 h-6"
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
