import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const platformSelector = {
  id: 'Platform Selcetor',
  title: 'Platform Selcetor',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Platform Selector',
      type: 'item',
      url: '/platform-selector',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'Overal Payment',
      title: 'Overal Payment',
      type: 'item',
      url: '/overal-payment',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default platformSelector;