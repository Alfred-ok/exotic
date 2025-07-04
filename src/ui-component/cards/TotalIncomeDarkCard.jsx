import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

export default function TotalIncomeDarkCard({ isLoading }) {
  const theme = useTheme();
  const [totalSuccess, setTotalSuccess] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://api.exoticnairobi.com/api/payments');
        const payments = response.data.payments || [];

        console.log(payments);
        const total = payments
          .filter((payment) => payment.status === 'success')
          .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

        setTotalSuccess(total);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <>
      {/*isLoading*/ false ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: 'primary.800',
                      color: '#fff'
                    }}
                  >
                    <TableChartOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                      KES {totalSuccess.toLocaleString()}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                      Payments processed
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
}

TotalIncomeDarkCard.propTypes = {
  isLoading: PropTypes.bool
};
