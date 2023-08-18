'use client';

import useUserStore from '@/store/userStore';
import Link from 'next/link';
import UserProfileDropdown from './UserProfileDropdown';

type Props = {};

const AuthButton = (props: Props) => {
  const [userData] = useUserStore((state) => [state.userData]);

  return (
    <div>
      {userData !== null ? (
        <UserProfileDropdown />
      ) : (
        <Link className="btn" href="/signin">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
