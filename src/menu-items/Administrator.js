import {
  IconReportAnalytics,
  IconSpeakerphone,
  IconKey,
  IconMessage,
  IconSettings,
  IconHistory
} from '@tabler/icons-react';
import { useEffect } from 'react';




const icons = {
  IconReportAnalytics,
  IconSpeakerphone,
  IconKey,
  IconMessage,
  IconSettings,
  IconHistory
};

const reportsMenu = {
  id: 'reports',
  title: 'Reports',
  type: 'collapse',
  icon: icons.IconReportAnalytics,
  children: [
    {
      id: 'report-users',
      title: 'Escort Profiles',
      type: 'item',
      url: '/reports/users',
      breadcrumbs: false
    },
    {
      id: 'report-payments',
      title: 'Payments',
      type: 'item',
      url: '/reports/payments',
      breadcrumbs: false
    }
  ]
};


const advertisementsMenu = {
  id: 'Package',
  title: 'Packages',
  type: 'item',
  url: '/package',
  icon: icons.IconSpeakerphone,
  breadcrumbs: false
};

const activatedProfileMenu = {
  id: 'Profile',
  title: 'Profile',
  type: 'item',
  url: '/Profile',
  icon: icons.IconKey,
  breadcrumbs: false
};

const messagesMenu = {
  id: 'messages',
  title: 'Messages',
  type: 'item',
  url: '/messages',
  icon: icons.IconMessage,
  breadcrumbs: false
};

const settingsMenu = {
  id: 'settings',
  title: 'Settings',
  type: 'collapse',
  icon: icons.IconSettings,
  children: [
    {
      id: 'platforms',
      title: 'Platforms',
      type: 'item',
      url: '/settings/platforms',
      breadcrumbs: false
    },
    {
      id: 'user',
      title: 'Platform User',
      type: 'item',
      url: '/settings/user',
      breadcrumbs: false
    }
  ]
};

const activeLogMenu = {
  id: 'active-log',
  title: 'Active Log',
  type: 'item',
  url: '/active-log',
  icon: icons.IconHistory,
  breadcrumbs: false
};

const platform = localStorage.getItem('platform');
const role = localStorage.getItem('userRole'); // 'admin', 'sub-admin', 'sales'

// Define access by role
let children = [];

if (role === 'admin') {
  children = [
    reportsMenu,
    advertisementsMenu,
    activatedProfileMenu,
    messagesMenu,
    settingsMenu,
    activeLogMenu
  ];
} else if (role === 'sub_admin') {
  children = [
    reportsMenu,
    advertisementsMenu,
    activatedProfileMenu
  ];
} else if (role === 'sales') {
  children = [
    reportsMenu,
    activatedProfileMenu
  ];
}

const SidebarMenu = {
  id: 'menu',
  title: 'Menu',
  type: 'group',
  children
};

export default platform ? SidebarMenu : null;



// Hook to listen for role changes across tabs
export function useRoleChangeRefresh() {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'userRole') {
        window.location.reload(); // Reload the page if role changes
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
}
