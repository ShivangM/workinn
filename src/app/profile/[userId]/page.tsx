import BasicDetails from '@/components/Profile/BasicDetails/BasicDetails';
import ProfileForm from '@/components/Profile/ProfileForm';
import React from 'react';

type Props = {
  params: {
    userId: string;
  };
};

const page = ({ params: { userId } }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-start justify-center gap-10">
      {/* @ts-ignore */}
      <BasicDetails userId={userId} viewOnly={true} />
      <ProfileForm userId={userId} viewOnly={true} />
    </div>
  );
};

export default page;
