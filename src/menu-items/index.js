import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import platformSelector from './platformSelector';
import dividlogo from './dividlogo';
import administrator from './Administrator';
import Report from './Report';
import OveralPayment from '../views/Reports/OveralPayment';


// ==============================|| MENU ITEMS ||============================== //
//Change
const menuItems = {
  items: [dividlogo, platformSelector, dashboard, administrator, OveralPayment].filter(Boolean)
};

export default menuItems;
