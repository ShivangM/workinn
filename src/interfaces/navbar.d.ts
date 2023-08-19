import { IconType } from 'react-icons/lib';

interface NavLink {
  name: string;
  url?: string;
}

export interface NavOption extends NavLink {
  sublinks?: NavLink[];
  Icon: IconType;
}
