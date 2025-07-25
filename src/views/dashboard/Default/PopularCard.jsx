




import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const dateOptions = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 365 Days', value: 365 }
];

export default function PopularCard() {
  const [recentUsers, setRecentUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedDays, setSelectedDays] = useState(7);

    const platformId = localStorage.getItem('platformId');

  const fetchUsers = async (days) => {
    try {
      const response = await axios.get(`https://api.exoticnairobi.com/api/recent-users?platform_id=${platformId}&days=${days}`);
      const users = response.data.new_users || [];
      setTotalUsers(users.length);
      const top5 = users
        .sort((a, b) => new Date(b.user_registered) - new Date(a.user_registered))
        .slice(0, 5);
      setRecentUsers(top5);
    } catch (error) {
      console.error('Failed to fetch recent users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(selectedDays);
  }, [selectedDays]);

  return (
    <MainCard content={false} sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Grid container spacing={1}>
          {/* Header with Dropdown */}
          <Grid item xs={12}>
            <div
              style={{
                backgroundColor: '#3b82f6',
                padding: '5px 20px',
                marginBottom: '20px',
                borderRadius: '5px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h4" sx={{ color: '#fff', padding:"5px" }}>
                New Profiles ({totalUsers})
              </Typography>

              <FormControl size="small" sx={{ minWidth: 120, backgroundColor: '#fff', borderRadius: 1 }}>
                <Select
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select Time Range' }}
                >
                  {dateOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>

          {/* Recent Users */}
          <Grid item xs={12}>
            {recentUsers.length === 0 ? (
              <Typography variant="body2">No recent users found.</Typography>
            ) : (
              recentUsers.map((user, index) => (
                <Grid item xs={12} key={user.ID}>
                  <Card
                    variant="outlined"
                    sx={{
                      backgroundColor: index % 2 === 0 ? 'rgb(231, 237, 248)' : '#f1f4f7',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      borderRadius: 2,
                      marginBottom: '8px',
                      p: 1.5,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar
                          alt={user.user_login}
                          src={user.avatar || undefined}
                          style={{ backgroundColor: '#3b82f6', color: '#fff' }}
                        >
                          {user.user_login[0]?.toUpperCase()}
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {user.user_login}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(user.user_registered).toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography variant="body2" sx={{ color: 'primary.main', mt: 0.5 }}>
                          {user.user_email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
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
  );
}

