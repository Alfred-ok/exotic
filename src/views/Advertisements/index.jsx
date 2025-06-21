
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Products from './Products';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Advertisements() {
  return (
    <MainCard title="Advertisements">
      <Products/>
    </MainCard>
  );
}
