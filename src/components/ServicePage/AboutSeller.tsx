import { UserData } from '@/interfaces/user';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import BasicDetailProperty from '../Profile/BasicDetails/BasicDetailProperty';

type Props = {
  userData: UserData;
};

const AboutSeller = ({ userData }: Props) => {
  const { displayName, photoURL, title, country, creationTime, uid } = userData;

  return (
    <div className="space-y-4 h-fit text-gray-600 bg-gray-50 rounded-lg shadow-md p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Image
            alt={displayName || 'User Profile Picture'}
            src={photoURL || '/assets/Dummy Profile.png'}
            height={50}
            width={50}
            className="object-cover rounded-full overflow-hidden"
          />

          <div className="text-left">
            <Link
              target="_blank"
              rel="noreffer"
              href={`/profile/${uid}`}
              className="text-lg font-bold hover:underline"
            >
              {displayName}
            </Link>
            <h3 className="text-sm text-gray-900">
              {title || 'No title provided'}
            </h3>
          </div>
        </div>

        <hr className="border w-full border-gray-200" />

        <div className="flex flex-col items-center justify-center text-sm text-gray-600 space-y-2 w-full">
          <BasicDetailProperty
            title="Country"
            value={country?.label || 'No country provided'}
            Icon={IoLocationSharp}
          />
          <BasicDetailProperty
            title="Member Since"
            value={moment(creationTime).format('MMM YYYY')}
            Icon={BsFillPersonFill}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSeller;
