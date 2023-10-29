'use client';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaPowerOff } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';
import useUiStore from '@/store/uiStore';
import { useRouter } from 'next/navigation';
import SidebarLinks from './SidebarLinks';
import { TbSwitchHorizontal } from 'react-icons/tb';
import { UserData, UserModes } from '@/interfaces/user.d';
import { useEffect, useState } from 'react';
import logout from '@/utils/logout';

const SideNav = () => {
  const [toggleSideNav, sideNavShow, userMode, toggleUserMode] = useUiStore(
    (state) => [
      state.toggleSideNav,
      state.sideNavShow,
      state.userMode,
      state.toggleUserMode,
    ]
  );

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user', {
          mode: 'no-cors',
          next: {
            tags: ['user-data'],
          },
        });
        const { user } = await response.json();
        setUserData(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const router = useRouter();

  const handleLogin = () => {
    toggleSideNav();
    router.push('/signin');
  };

  return (
    <div className="w-full">
      <div
        onClick={toggleSideNav}
        className={classNames(
          'w-full h-screen bg-black opacity-80 z-40 fixed transition-all duration-300 ease-in-out',
          sideNavShow ? 'block' : 'hidden'
        )}
      />

      <aside
        className={classNames(
          'fixed h-screen overflow-y-hidden max-w-xs sm:max-w-sm w-full p-4 z-50 transition-all duration-300 bg-white ease-in-out top-0 left-0',
          sideNavShow
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer">
            <Image
              height={150}
              width={150}
              className=""
              alt="WorkInn Logo"
              src="/WorkInn Logo.svg"
            />
          </Link>
          <AiFillCloseCircle
            onClick={toggleSideNav}
            className="text-red-500 text-2xl cursor-pointer"
          />
        </div>

        <SidebarLinks />

        <div className="w-full absolute bottom-6 left-0 px-4">
          <div className="space-y-4">
            {userData !== null ? (
              <div className="flex space-x-2 items-center">
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
            ) : null}

            {userData !== null ? (
              <button
                className={classNames(
                  'btnOutline',
                  'border-teal-500 hover:border-teal-600'
                )}
                onClick={toggleUserMode}
              >
                <span className="flex cursor-pointer items-center">
                  <span>
                    Switch To{' '}
                    {userMode === UserModes.SELLER
                      ? UserModes.BUYER
                      : UserModes.SELLER}
                  </span>
                  <TbSwitchHorizontal className={`ml-2 text-teal-500`} />
                </span>
              </button>
            ) : null}

            <button
              className={classNames(
                'btnOutline',
                userData !== null
                  ? 'border-red-500 hover:border-red-600'
                  : 'border-brand hover:border-teal-500'
              )}
              onClick={userData !== null ? logout : handleLogin}
            >
              <span className="flex cursor-pointer items-center">
                <span>{userData !== null ? 'Logout' : 'Login'}</span>
                {userData !== null ? (
                  <FaPowerOff className="text-red-500 ml-2" />
                ) : (
                  <BiLogInCircle className="text-gray-500 ml-2" />
                )}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
