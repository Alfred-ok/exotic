
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui

import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import TopProfilesChart from './TopProfilesChart';

export default function PopularCard({ isLoading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [recentUsers, setRecentUsers] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get('https://api.exoticnairobi.com/api/recent-users?days=60')
      .then((response) => {
        const users = response.data.new_users || [];
        const top5 = users
          .sort((a, b) => new Date(b.user_registered) - new Date(a.user_registered))
          .slice(0, 5);
        setRecentUsers(top5);
      })
      .catch((error) => {
        console.error('Failed to fetch recent users:', error);
      });
  }, []);

  return (
    <>
      {/*isLoading*/ false ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid xs={12}>
                <Grid container sx={{ alignContent: 'center', justifyContent: 'space-between' }}>
                  <Grid>
                    <Typography variant="h4">Recent Activities</Typography>
                  </Grid>
                  <Grid>
                    <IconButton
                      size="small"
                      sx={{ mt: -0.625 }}
                      onClick={handleClick}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                    >
                      <MoreHorizOutlinedIcon fontSize="small" sx={{ cursor: 'pointer' }} />
                    </IconButton>
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem onClick={handleClose}>Today</MenuItem>
                      <MenuItem onClick={handleClose}>This Month</MenuItem>
                      <MenuItem onClick={handleClose}>This Year</MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>

              <Grid xs={12} sx={{ mt: -1 }}>
                <TopProfilesChart />
              </Grid>

              <Grid xs={12}>
                {recentUsers.length === 0 ? (
                  <Typography variant="body2">No recent users found.</Typography>
                ) : (
                  recentUsers.map((user) => (
                    <React.Fragment key={user.ID}>
                      <Grid container direction="column" className='p-3'>
                        <Grid>
                          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Grid>
                              <Typography variant="subtitle1" color="inherit">
                                {user.user_login}
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography variant="subtitle2" color="textSecondary">
                                {new Date(user.user_registered).toLocaleString()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                            {user.user_email}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                    </React.Fragment>
                  ))
                )}
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

