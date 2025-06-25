import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PlatformSelector from '../views/platformSelector';
import Reports from '../views/Reports';
import Advertisements from '../views/Advertisements';
import Messages from '../views/Messages';
import Settings from '../views/Settings';
import ActiveLog from '../views/ActiveLog';
import FreeTrialActivation from '../views/FreeTrialActivation';

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
    {
      path: 'reports',
      element: <Reports/>
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
      path: 'settings',
      element: <Settings/>
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
    /*
    {
      path: 'reportss',
      element: <Reports />,
      children: [
        {
          path: 'rep1',
          element: <Reports/>
        },
        {
          path: 'rep2',
          element: <Reports />
        }
      ]
    }*/


  ]
};

export default MainRoutes;
