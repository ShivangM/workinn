import { SIDENAV_OPTIONS } from '@/constants/sidenavOptions';
import React from 'react';
import SideBarOptions from './SideBarOptions';

type Props = {};

const SidebarLinks = (props: Props) => {
  return (
    <div className="space-y-2 py-6 lg:py-0 lg:space-y-0 lg:space-x-8 lg:flex h-[440px] overflow-y-auto items-center">
      {SIDENAV_OPTIONS.map((option, idx) => (
        <SideBarOptions key={idx} option={option} />
      ))}
    </div>
  );
};

export default SidebarLinks;
