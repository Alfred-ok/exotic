import PropTypes from 'prop-types';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import { bouncy } from 'ldrs'
//import { useNavigate } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';


export default function EarningCard({ isLoading }) {
  const theme = useTheme();
  bouncy.register();
  //const location = useLocation();
  //const { platformId } = location.state || {};

  const platformId = localStorage.getItem('platformId');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dashboardData, setDashboardData] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.post(
          'https://api.exoticnairobi.com/api/summary',
          { platform_id: platformId }
        );
        console.log('Dashboard Response:', response.data); // Check structure
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch earning data:', error);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <>
      {/*isLoading*/ false ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          aria-hidden={Boolean(anchorEl)}
          sx={{
            bgcolor: 'secondary.dark',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -125 },
              right: { xs: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid>
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: 'secondary.800',
                        mt: 1
                      }}
                    >
                      <CardMedia sx={{ width: 24, height: 24 }} component="img" src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                  <Grid>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        bgcolor: 'secondary.dark',
                        color: 'secondary.200',
                        zIndex: 1
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreHorizIcon fontSize="inherit" />
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container sx={{ alignItems: 'center' }}>
                  <Grid>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      {dashboardData?.active_profiles ?? <l-bouncy size="25" speed="1.75" color="white" ></l-bouncy>}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        bgcolor: 'secondary.200',
                        color: 'secondary.dark'
                      }}
                    >
                      <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'secondary.200'
                  }}
                >
                  Active Profiles
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

EarningCard.propTypes = { isLoading: PropTypes.bool };
