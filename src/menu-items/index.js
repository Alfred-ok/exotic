import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import platformSelector from './platformSelector';
import dividlogo from './dividlogo';
import administrator from './Administrator';
import Report from './Report';


// ==============================|| MENU ITEMS ||============================== //
//Change
const menuItems = {
  items: [dividlogo, platformSelector, dashboard, administrator].filter(Boolean) // Removes null if platform isn't 'Exotic Nairobi'
};

export default menuItems;
