'use client';
import useUiStore from '@/store/uiStore';

import { FaCog, FaUser } from 'react-icons/fa';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { RiPagesLine, RiBillLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdExplore } from 'react-icons/md';

import { UserProfileDropdownOption } from '@/interfaces/navbar';
import { UserModes } from '@/interfaces/user.d';

const useNavbarLinks = () => {
  const [userMode] = useUiStore((state) => [state.userMode]);

  const userProfileDropdownOption: UserProfileDropdownOption[] =
    userMode === UserModes.BUYER
      ? [
          {
            href: '/profile',
            Icon: FaUser,
            name: 'Profile',
          },
          {
            href: '/dashboard',
            Icon: RxDashboard,
            name: 'Dashboard',
          },
          {
            href: '/post-request',
            Icon: RiPagesLine,
            name: 'Post a Request',
          },
          {
            href: '/settings',
            Icon: FaCog,
            name: 'Settings',
          },
          {
            href: '/billings-payments',
            Icon: RiBillLine,
            name: 'Billing & Payments',
          },
          {
            href: '/refer-friend',
            Icon: AiOutlineTeam,
            name: 'Refer a Friend',
          },
          {
            href: '/help-support',
            Icon: BiHelpCircle,
            name: 'Help & Support',
          },
        ]
      : [
          {
            href: '/profile',
            Icon: FaUser,
            name: 'Profile',
          },
          {
            href: '/dashboard',
            Icon: RxDashboard,
            name: 'Dashboard',
          },
          {
            href: '/settings',
            Icon: FaCog,
            name: 'Settings',
          },
          {
            href: '/billings-payments',
            Icon: RiBillLine,
            name: 'Billing & Payments',
          },
          {
            href: '/refer-friend',
            Icon: AiOutlineTeam,
            name: 'Refer a Friend',
          },
          {
            href: '/help-support',
            Icon: BiHelpCircle,
            name: 'Help & Support',
          },
        ];

  const sidenavOptions =
    userMode === UserModes.BUYER
      ? [
          {
            name: 'Home',
            Icon: AiOutlineHome,
            url: '/',
          },
          {
            name: 'Explore',
            url: '/services',
            Icon: MdExplore,
          },
          {
            name: 'Users',
            Icon: BsFillPersonFill,
            sublinks: [
              {
                name: 'Profile',
                url: '/profile',
              },
              {
                name: 'Dashboard',
                url: '/dashboard',
              },
              {
                name: 'Post a Request',
                url: '/post-request',
              },
              {
                name: 'Settings',
                url: '/settings',
              },
              {
                name: 'Billings & Payments',
                url: '/billings-payments',
              },
              {
                name: 'Refer a Friend',
                url: '/refer-friend',
              },
              {
                name: 'Help & Support',
                url: '/help-support',
              },
            ],
          },
        ]
      : [
          {
            name: 'Home',
            Icon: AiOutlineHome,
            url: '/',
          },
          {
            name: 'Explore',
            url: '/services',
            Icon: MdExplore,
          },
          {
            name: 'Users',
            Icon: BsFillPersonFill,
            sublinks: [
              {
                name: 'Profile',
                url: '/profile',
              },
              {
                name: 'Dashboard',
                url: '/dashboard',
              },
              {
                name: 'Settings',
                url: '/settings',
              },
              {
                name: 'Billings & Payments',
                url: '/billings-payments',
              },
              {
                name: 'Refer a Friend',
                url: '/refer-friend',
              },
              {
                name: 'Help & Support',
                url: '/help-support',
              },
            ],
          },
        ];

  return { userProfileDropdownOption, sidenavOptions };
};

export default useNavbarLinks;
