import React from 'react';
import Image from '../../node_modules/next/image';
import Link from '../../node_modules/next/link';
import SearchBar from './SearchBar';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="w-full sticky z-40 bg-gray-50 shadow-md py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="">
            <Image
              height={180}
              width={180}
              className=""
              alt="WorkInn Logo"
              src="/WorkInn Logo.svg"
            />
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <Link className="hover:underline" href="/explore">
              Explore
            </Link>
            <Link className="hover:underline" href="/seller">
              Become a Seller
            </Link>
          </div>

          <Link className="btn" href="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
