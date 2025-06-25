import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { alpha, useTheme, styled } from '@mui/material/styles';
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

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

export default function TotalIncomeLightCard({ isLoading, icon, label }) {
  const theme = useTheme();
  const [pendingTotal, setPendingTotal] = useState(0);

  useEffect(() => {
    fetch('https://api.exoticnairobi.com/api/payments')
      .then(res => res.json())
      .then(data => {
        const pendingPayments = data.payments.filter(p => p.status === 'pending');
        const totalAmount = pendingPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
        setPendingTotal(totalAmount);
      })
      .catch(err => console.error('Error fetching payments:', err));
  }, []);

  return (
    <>
      {/*isLoading*/ false ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} sx={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',}}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      bgcolor: label === 'Meeting attends' ? alpha(theme.palette.error.light, 0.25) : 'warning.light',
                      color: label === 'Meeting attends' ? 'error.dark' : 'warning.dark'
                    }}
                  >
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={
                    <Typography variant="h4">
                      Ksh {pendingTotal.toLocaleString()}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.5 }}>
                      Pending payment
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

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.string
};
