
// material-ui
import Typography from '@mui/material/Typography';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import Products from './Products';
import { useTheme } from '@emotion/react';
import CampaignIcon from '@mui/icons-material/Campaign';
// ==============================|| SAMPLE PAGE ||============================== //

export default function Advertisements() {
  const theme = useTheme();
  return (
    <MainCard 
      title={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '20px 16px',
            borderRadius: '8px'
          }}>
            <CampaignIcon />
            <span>Advertisements</span>
          </div>
        }
      >
      <Products/>
    </MainCard>
  );
}
