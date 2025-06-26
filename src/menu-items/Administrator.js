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
          title: 'Users',
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
      id: 'free-trial-activation',
      title: 'Free Trial Activation',
      type: 'item',
      url: '/free-trial-activation',
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
      type: 'item',
      url: '/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
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

export default Administrator;
