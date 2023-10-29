import Image from '../../node_modules/next/image';
import Link from '../../node_modules/next/link';
import SearchBar from './SearchBar';
import HamburgerIcon from './HamburgerIcon';
import UserProfileDropdown from './UserProfileDropdown';
import fetchUserData from '@/lib/profile/fetchUserData';

const Navbar = async () => {
  const { data: userData } = await fetchUserData();

  return (
    <nav
      style={{ backdropFilter: 'blur(10px)' }}
      className="w-full top-0 fixed z-30 bg-white bg-opacity-70 bg-clip-padding shadow-md py-2 px-2 sm:px-4"
    >
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

        <div className="hidden lg:flex items-center space-x-6">
          <Link
            className="text-gray-700 hover:text-gray-900 hover:underline"
            href="/categories"
          >
            Explore
          </Link>
          <Link
            className="text-gray-700 hover:text-gray-900 hover:underline"
            href="/become-a-seller"
          >
            Become a Seller
          </Link>

          {userData ? (
            <UserProfileDropdown userData={userData} />
          ) : (
            <Link className="btn" href="/signin">
              Sign In
            </Link>
          )}
        </div>

        <HamburgerIcon />
      </div>
    </nav>
  );
};

export default Navbar;
