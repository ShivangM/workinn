'use client';
import useUiStore from '@/store/uiStore';
import { UserProfileDropdownOption } from '@/interfaces/navbar';
import { UserModes } from '@/interfaces/user.d';
import {
  buyerDropdownOptions,
  buyerDropdownOptionsSideNav,
} from '@/constants/buyerDropdownOptions';
import {
  sellerDropdownOptions,
  sellerDropdownOptionsSideNav,
} from '@/constants/sellerDropdownOptions';

const useNavbarLinks = () => {
  const [userMode] = useUiStore((state) => [state.userMode]);

  const userProfileDropdownOption: UserProfileDropdownOption[] =
    userMode === UserModes.BUYER ? buyerDropdownOptions : sellerDropdownOptions;

  const sidenavOptions =
    userMode === UserModes.BUYER
      ? buyerDropdownOptionsSideNav
      : sellerDropdownOptionsSideNav;

  return { userProfileDropdownOption, sidenavOptions };
};

export default useNavbarLinks;
