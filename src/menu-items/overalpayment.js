import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const OveralPayment= {
  id: 'Overal Payment',
  title: 'Overal Payment',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Overal Payment',
      type: 'item',
      url: '/overal-payment',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default OveralPayment;