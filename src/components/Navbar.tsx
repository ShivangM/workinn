import React from 'react';
import Image from '../../node_modules/next/image';
import Link from '../../node_modules/next/link';
import SearchBar from './SearchBar';
import HamburgerIcon from './HamburgerIcon';
import AuthButton from './AuthButton';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="w-full sticky z-30 bg-gray-50 shadow-md py-2 px-2 sm:px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <Link href="/" className="">
            <Image
              height={60}
              width={60}
              className="sm:hidden"
              alt="WorkInn Logo"
              src="/WorkInn Favicon.svg"
            />

            <Image
              height={180}
              width={180}
              className="hidden sm:block"
              alt="WorkInn Logo"
              src="/WorkInn Logo.svg"
            />
          </Link>
          <SearchBar />
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <Link
              className="text-gray-700 hover:text-gray-900 hover:underline"
              href="/explore"
            >
              Explore
            </Link>
            <Link
              className="text-gray-700 hover:text-gray-900 hover:underline"
              href="/seller"
            >
              Become a Seller
            </Link>
          </div>

          <AuthButton />
        </div>

        <HamburgerIcon />
      </div>
    </nav>
  );
};

export default Navbar;
