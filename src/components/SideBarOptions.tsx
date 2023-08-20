import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import classNames from 'classnames';
import useUiStore from '@/store/uiStore';
import { NavOption } from '@/interfaces/navbar';

type NavOptionsProps = {
  option: NavOption;
};

const SideBarOptions = ({ option }: NavOptionsProps) => {
  const { Icon, name, url, sublinks } = option;
  const [toggleSideNav] = useUiStore((state) => [state.toggleSideNav]);

  return (
    <div className="relative text-gray-700 hover:underline">
      {url ? (
        <Link onClick={toggleSideNav} href={url} className="sidebar-link">
          <Icon className="h-5 w-5" />
          <span>{name}</span>
        </Link>
      ) : (
        <Disclosure>
          {({ open, close }) => (
            <div className="relative">
              <Disclosure.Button className="sidebar-link justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? 'transform rotate-0' : 'rotate-180'
                  } h-5 w-5 hover:text-brand transition-all duration-300 ease-in-out`}
                />
              </Disclosure.Button>
              <div
                className={classNames(
                  'px-0 py-2 text-sm flex -z-10 flex-col space-y-2 transition-all duration-300 ease-out lg:absolute lg:top-8 lg:px-2 lg:bg-white lg:rounded-lg',
                  open
                    ? 'block lg:translate-y-0 lg:opacity-100 z-0'
                    : 'hidden lg:-translate-y-full lg:opacity-0'
                )}
              >
                {sublinks!.map((sublink, idx) => {
                  const { name, url } = sublink;
                  return (
                    <Link
                      onClick={() => {
                        close();
                        toggleSideNav();
                      }}
                      href={url!}
                      key={idx}
                      className="sidebar-link  lg:px-4 lg:py-2 lg:bg-gray-100 whitespace-nowrap lg:hover:bg-gray-200 lg:focus:bg-gray-200 "
                    >
                      {name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </Disclosure>
      )}
    </div>
  );
};

export default SideBarOptions;
