// assets
/*import {
  IconReportAnalytics,
  IconMegaphone,
  IconClockPlay,
  IconMessageDots,
  IconSettings,
  IconHistory,
  IconKey
} from '@tabler/icons-react';

// constant
const icons = {
  IconReportAnalytics,
  IconMegaphone,
  IconClockPlay,
  IconMessageDots,
  IconSettings,
  IconHistory,
  IconKey
};

// ==============================|| Administrator ||============================== //
//RUN

const Administrator = {
  id: 'administrator',
  title: 'Administrator',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    
    {
      id: 'default',
      title: 'Advertisements',
      type: 'item',
      url: '/advertisements',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Free Trial Activation',
      type: 'item',
      url: '/free-trial-activation',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
        id: 'default',
        title: 'Messages',
        type: 'item',
        url: '/messages',
        icon: icons.IconBrandChrome,
        breadcrumbs: false
    },
    {
        id: 'default',
        title: 'Settings',
        type: 'item',
        url: '/settings',
        icon: icons.IconHelp,
        breadcrumbs: false
    },
    {
        id: 'default',
        title: 'Active Log',
        type: 'item',
        url: '/active-log',
        icon: icons.IconHelp,
        breadcrumbs: false
    }
  ]
};

export default Administrator;*/










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
      type: 'item',
      url: '/reports',
      icon: icons.IconReportAnalytics,
      breadcrumbs: false
    },
    {
      id: 'advertisements',
      title: 'Advertisements',
      type: 'item',
      url: '/advertisements',
      icon: icons.IconSpeakerphone, // VALID alternative to "Megaphone"
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
