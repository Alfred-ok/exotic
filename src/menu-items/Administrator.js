
import {
  IconReportAnalytics,
  IconSpeakerphone,
  IconKey,
  IconMessage,
  IconSettings,
  IconHistory
} from '@tabler/icons-react';

const icons = {
  IconReportAnalytics,
  IconSpeakerphone,
  IconKey,
  IconMessage,
  IconSettings,
  IconHistory
};

// ==============================|| Administrator ||============================== //
const platform = localStorage.getItem('platform');

const Administrator = {
  id: 'administrator',
  title: 'Administrator',
  type: 'group',
  children: [
    {
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
    },
    {
      id: 'advertisements',
      title: 'Advertisements',
      type: 'item',
      url: '/advertisements',
      icon: icons.IconSpeakerphone,
      breadcrumbs: false
    },
    {
      id: 'ActivatedProfile',
      title: 'Activated Profile',
      type: 'item',
      url: '/ActivatedProfile',
      icon: icons.IconKey,
      breadcrumbs: false
    },
    {
      id: 'messages',
      title: 'Messages',
      type: 'item',
      url: '/messages',
      icon: icons.IconMessage,
      breadcrumbs: false
    },

    {
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
    },
    {
      id: 'active-log',
      title: 'Active Log',
      type: 'item',
      url: '/active-log',
      icon: icons.IconHistory,
      breadcrumbs: false
    }
  ]
};

//export default Administrator;
export default platform ? Administrator : null;
