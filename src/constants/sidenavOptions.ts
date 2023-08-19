import { AiOutlineHome, AiOutlineTeam } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdExplore } from 'react-icons/md';

export const SIDENAV_OPTIONS = [
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
];
