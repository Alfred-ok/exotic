
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
      sx={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' // or keep the same value to prevent disappearing
            }
          }}
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
            <span>Packages</span>
          </div>
        }
      >
      <Products/>
    </MainCard>
  );
}
