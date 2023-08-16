'use client';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaPowerOff } from 'react-icons/fa';
import useUiStore from '@/store/uiStore';

const SideNav = () => {
  const [toggleSideNav, sideNavShow] = useUiStore((state) => [
    state.toggleSideNav,
    state.sideNavShow,
  ]);

  const logout = () => {
    localStorage.removeItem('token');
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
              height={100}
              width={100}
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

        <div className="w-full absolute bottom-6 left-0 px-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 items-center">
              {/* <Image
                alt={userData?.name || 'User'}
                src={userData?.image}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {userData?.name?.join(' ')?.slice(0, 14)}
                  {userData?.name?.join(' ')?.length > 14 ? '...' : ''}
                </span>
                <span className="text-xs text-gray-500">
                  {userData?.email?.slice(0, 14)}
                  {userData?.email?.length > 14 ? '...' : ''}
                </span>
              </div> */}
            </div>

            <button className="border-2 px-4 rounded-lg py-2 border-red-500">
              <span
                onClick={logout}
                className="flex cursor-pointer items-center"
              >
                Logout <FaPowerOff className="text-red-500 ml-2" />
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
