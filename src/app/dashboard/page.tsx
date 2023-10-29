import DashboardNavigation from '@/components/Dashboard/DashboardNavigation';
import DashboardSection from '@/components/Dashboard/DashboardSection';
import React from 'react';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex min-h-screen space-x-8">
      <DashboardNavigation />
      <DashboardSection />
    </div>
  );
};

export default page;
