import BasicDetails from '@/components/Profile/BasicDetails/BasicDetails';
import ProfileForm from '@/components/Profile/ProfileForm';
import React from 'react';

const page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-start justify-center gap-10">
      {/* @ts-ignore */}
      <BasicDetails viewOnly={false} />
      <ProfileForm viewOnly={false} />
    </div>
  );
};

export default page;
