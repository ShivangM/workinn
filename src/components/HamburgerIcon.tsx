'use client';
import useUiStore from '@/store/uiStore';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const HamburgerIcon = () => {
  const [toggleSideNav] = useUiStore((state) => [state.toggleSideNav]);

  return (
    <GiHamburgerMenu
      onClick={toggleSideNav}
      className="h-8 w-8 mx-2 cursor-pointer lg:hidden"
    />
  );
};

export default HamburgerIcon;
