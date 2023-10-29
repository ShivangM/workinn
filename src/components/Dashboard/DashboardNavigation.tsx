'use client';

import useDashboard from '@/hooks/useDashboard';
import useDashboardStore from '@/store/dashboardStore';
import classNames from 'classnames';

const DashboardNavigation = () => {
  const { options } = useDashboard();
  const [setSelectedTab, selectedTab] = useDashboardStore((state) => [
    state.setSelectedTab,
    state.selectedTab,
  ]);

  return (
    <aside className="bg-white rounded-xl p-6 h-full w-full max-w-xs space-y-4">
      {options.map((option, index) => {
        const { Icon, label, value } = option;
        return (
          <button
            key={index}
            onClick={() => setSelectedTab(value)}
            className={classNames(
              'flex items-center space-x-2 w-full p-4 hover:bg-gray-100 rounded-lg',
              selectedTab === value ? 'bg-gray-200' : 'bg-gray-50'
            )}
          >
            <Icon className="text-2xl" />
            <span className="text-sm font-semibold">{label}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default DashboardNavigation;
