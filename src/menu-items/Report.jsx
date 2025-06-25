// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};


// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const Report = {
  //id: 'default',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Reports',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'default',
          title: 'Users',
          type: 'item',
          url: '/pages/login',
          target: true
        },
        {
          id: 'default',
          title: 'Payment',
          type: 'item',
          url: '/pages/register',
          target: true
        }
      ]
    }
  ]
};

export default Report;
