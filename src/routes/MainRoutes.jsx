import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PlatformSelector from '../views/platformSelector';

import Advertisements from '../views/Advertisements';
import Messages from '../views/Messages';
import ActiveLog from '../views/ActiveLog';
import FreeTrialActivation from '../views/FreeTrialActivation';
import PaymentsTable from '../views/Reports/PaymentsTable';
import EscortPostsTable from '../views/Reports/EscortPostsTable';
import PlatformManager from '../views/Settings/PlatformManager';
import RegisterPlatformUser from '../views/Settings/RegisterPlatformUser';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

   
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'platform-selector',
      element: <PlatformSelector/>
    },

    //Reports
    {
      path: '/reports/users',
      element: <EscortPostsTable/>
    },
    {
      path: '/reports/payments',
      element: <PaymentsTable/>
    },

    {
      path: 'advertisements',
      element: <Advertisements/>
    },
    {
      path: 'free-trial-activation',
      element: <FreeTrialActivation/>
    },

    {
      path: 'messages',
      element: <Messages/>
    },
    
    {
      path: '/settings/platforms',
      element: <PlatformManager/>
    },
    {
      path: '/settings/userRegistration',
      element: <RegisterPlatformUser/>
    },
    {
      path: 'active-log',
      element: <ActiveLog/>
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },

  ]
};

export default MainRoutes;
