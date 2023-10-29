import Image from 'next/image';
import React from 'react';
import ReadMorePara from '../../Common/ReadMorePara';
import { IoLocationSharp } from 'react-icons/io5';
import moment from 'moment';
import { BsFillPersonFill } from 'react-icons/bs';
import EditBasicDetailsButton from './EditBasicDetailsButton';
import fetchUserData from '@/lib/profile/fetchUserData';
import { redirect } from 'next/navigation';
import BasicDetailProperty from './BasicDetailProperty';

type BasicDetailsProps = {
  viewOnly: boolean;
  userId?: string;
};

const BasicDetails = async ({ viewOnly, userId }: BasicDetailsProps) => {
  let userData = null;

  try {
    const { data } = await fetchUserData(userId);
    userData = data;
  } catch (error) {
    redirect('/signin');
  }

  return (
    <section
      title="Basic Details"
      className="flex flex-col w-full bg-white rounded-lg p-6 lg:col-span-1 shadow-md gap-2 sticky top-28"
    >
      {!viewOnly && userData ? (
        <EditBasicDetailsButton basicDetails={userData} />
      ) : null}

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full overflow-hidden relative w-1/2 mx-auto aspect-square">
          <Image
            alt={userData?.displayName || 'User Profile Picture'}
            src={userData?.photoURL || '/assets/Dummy Profile.png'}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-lg font-bold">{userData?.displayName}</h1>
          <h3 className="text-sm text-gray-700">
            {userData?.title || 'No title provided'}
          </h3>
        </div>

        <ReadMorePara
          lines={3}
          className="text-xs sm:text-sm text-center text-gray-600"
        >
          {userData?.description || 'No description provided'}
        </ReadMorePara>

        <hr className="border w-full border-gray-200" />

        <div className="flex flex-col items-center justify-center text-sm text-gray-600 space-y-2 w-full">
          <BasicDetailProperty
            title="Country"
            value={userData?.country?.label || 'No country provided'}
            Icon={IoLocationSharp}
          />
          <BasicDetailProperty
            title="Member Since"
            value={moment(userData?.creationTime).format('MMM YYYY')}
            Icon={BsFillPersonFill}
          />
        </div>
      </div>
    </section>
  );
};

export default BasicDetails;
