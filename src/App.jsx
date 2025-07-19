import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import ThemeCustomization from 'themes';
import { useRoleChangeRefresh } from './menu-items/Administrator';

// auth provider

// ==============================|| APP ||============================== //

export default function App() {

  useRoleChangeRefresh(); // This will auto-refresh on localStorage role change

  return (
    <ThemeCustomization>
      <NavigationScroll>
        <>
          <RouterProvider router={router} />
        </>
      </NavigationScroll>
    </ThemeCustomization>
  );
}
