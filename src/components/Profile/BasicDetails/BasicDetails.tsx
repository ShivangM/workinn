import Image from 'next/image';
import React from 'react';
import ReadMorePara from '../../Common/ReadMorePara';
import { IoLocationSharp } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import moment from 'moment';
import { BsFillPersonFill } from 'react-icons/bs';
import EditBasicDetailsButton from './EditBasicDetailsButton';
import fetchUserData from '@/lib/profile/fetchUserData';
import { cookies } from 'next/headers';

type Props = {
  title: string;
  value: string;
  Icon: IconType;
};

const BasicDetailProperty = ({ title, value, Icon }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Icon />
        <span>{title}</span>
      </div>
      <p className="font-bold">{value}</p>
    </div>
  );
};

const BasicDetails = async () => {
  const token = cookies().get('token')?.value;
  const { data: userData } = await fetchUserData(token);

  return (
    <section
      title="Basic Details"
      className="flex flex-col w-full bg-white rounded-lg p-6 col-span-1 shadow-md gap-2 relative"
    >
      <EditBasicDetailsButton basicDetails={userData} />

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full overflow-hidden relative w-3/4 mx-auto aspect-square">
          <Image
            alt={userData.displayName}
            src={userData.photoURL || '/assets/Dummy Profile.png'}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-lg font-bold">{userData.displayName}</h1>
          <h3 className="text-sm text-gray-700">
            {userData.title || 'No title provided'}
          </h3>
        </div>

        <ReadMorePara
          lines={3}
          className="text-xs sm:text-sm text-center text-gray-600"
        >
          {userData.description || 'No description provided'}
        </ReadMorePara>

        <hr className="border w-full border-gray-200" />

        <div className="flex flex-col items-center justify-center text-sm text-gray-600 space-y-2 w-full">
          <BasicDetailProperty
            title="Country"
            value={userData.country.label || 'No country provided'}
            Icon={IoLocationSharp}
          />
          <BasicDetailProperty
            title="Member Since"
            value={moment(userData.creationTime).format('MMM YYYY')}
            Icon={BsFillPersonFill}
          />
        </div>
      </div>
    </section>
  );
};

export default BasicDetails;