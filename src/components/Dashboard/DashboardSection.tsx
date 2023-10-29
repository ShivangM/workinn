'use client';
import useDashboard from '@/hooks/useDashboard';
import useDashboardStore from '@/store/dashboardStore';
import React from 'react';

const DashboardSection = () => {
  const [selectedTab] = useDashboardStore((state) => [state.selectedTab]);
  const { Section } = useDashboard();

  return (
    <div className="bg-white rounded-xl p-8 h-full w-full">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold capitalize">
        {selectedTab}
      </h3>
      <Section />
    </div>
  );
};

export default DashboardSection;
