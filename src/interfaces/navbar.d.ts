import { IconType } from 'react-icons/lib';

interface NavLink {
  name: string;
  url?: string;
}

type UserProfileDropdownOption = {
  href: string;
  Icon: IconType;
  name: string;
};

export interface NavOption extends NavLink {
  sublinks?: NavLink[];
  Icon: IconType;
}
