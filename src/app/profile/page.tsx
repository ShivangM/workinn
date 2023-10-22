import BasicDetails from '@/components/Profile/BasicDetails/BasicDetails';
import ProfileForm from '@/components/Profile/ProfileForm';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-start justify-center gap-10">
      {/* @ts-expect-error Async Server Component */}
      <BasicDetails />
      <ProfileForm />
    </div>
  );
};

export default page;
