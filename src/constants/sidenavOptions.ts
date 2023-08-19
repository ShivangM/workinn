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
        name: 'Orders',
        url: '/orders',
      },
      {
        name: 'Settings',
        url: '/settings',
      },
    ],
  },
];
