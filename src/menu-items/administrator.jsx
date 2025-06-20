// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| Administrator ||============================== //

const administrator = {
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

export default administrator;
