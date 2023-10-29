'use client';
import Image from 'next/image';
import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { TbSwitchHorizontal } from 'react-icons/tb';
import { UserProfileDropdownOption } from '@/interfaces/navbar';
import useNavbarLinks from '@/hooks/useNavbarLinks';
import useUiStore from '@/store/uiStore';
import { UserData, UserModes } from '@/interfaces/user.d';
import logout from '@/utils/logout';

const UserProfileDropdownOption = ({
  option,
}: {
  option: UserProfileDropdownOption;
}) => {
  const { Icon, href, name } = option;
  return (
    <li className="font-medium text-sm">
      <Link
        href={href}
        className={`flex items-center transform transition-colors p-2 hover:bg-gray-100 duration-200 border-r-4 border-transparent hover:border-brand`}
      >
        <div className="mr-3">
          <Icon className={`w-5 h-5`} />
        </div>
        {name}
      </Link>
    </li>
  );
};

const UserProfileDropdown = ({ userData }: { userData: UserData }) => {
  const [userMode, toggleUserMode] = useUiStore((state) => [
    state.userMode,
    state.toggleUserMode,
  ]);

  const { userProfileDropdownOption } = useNavbarLinks();

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
            alt={userData?.displayName || 'Users Profile Picture'}
            src={userData?.photoURL || '/assets/Dummy Profile.png'}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm line-clamp-1 font-semibold">
              {userData?.displayName}
            </span>
            <span className="text-xs line-clamp-1 text-gray-500">
              {userData?.email}
            </span>
          </div>
        </div>

        {show ? (
          <div className="absolute w-60 p-3 bg-white rounded-lg shadow border mt-5 right-0">
            <ul className="space-y-3">
              {userProfileDropdownOption.map((option, idx) => (
                <UserProfileDropdownOption option={option} key={idx} />
              ))}

              <hr className="" />

              <li className="font-medium text-sm">
                <button
                  onClick={toggleUserMode}
                  className="flex items-center transform transition-colors p-2 hover:bg-gray-100 duration-200 border-r-4 w-full border-transparent text-teal-600 hover:border-teal-600"
                >
                  <div className="mr-3">
                    <TbSwitchHorizontal className={`w-5 h-5`} />
                  </div>
                  Switch To{' '}
                  {userMode === UserModes.SELLER
                    ? UserModes.BUYER
                    : UserModes.SELLER}
                </button>
              </li>

              <li className="font-medium text-sm">
                <button
                  onClick={logout}
                  className="flex items-center transform transition-colors p-2 hover:bg-gray-100 duration-200 border-r-4 w-full border-transparent hover:border-red-600"
                >
                  <div className="mr-3 text-red-600">
                    <RiLogoutBoxRLine className={`w-5 h-5`} />
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
