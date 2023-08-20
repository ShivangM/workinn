'use client';
import useNavbarLinks from '@/hooks/useNavbarLinks';
import React from 'react';
import SideBarOptions from './SideBarOptions';

type Props = {};

const SidebarLinks = (props: Props) => {
  const { sidenavOptions } = useNavbarLinks();
  return (
    <div className="space-y-2 py-6 lg:py-0 lg:space-y-0 lg:space-x-8 lg:flex h-[440px] overflow-y-auto items-center">
      {sidenavOptions.map((option, idx) => (
        <SideBarOptions key={idx} option={option} />
      ))}
    </div>
  );
};

export default SidebarLinks;
