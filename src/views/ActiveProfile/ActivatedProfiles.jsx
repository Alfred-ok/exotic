
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress, Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const ActivatedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://api.exoticnairobi.com/api/activated-profiles')
      .then(response => {
        setProfiles(response.data.activated_profiles);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activated profiles:', error);
        setError('Failed to fetch activated profiles');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
                <span>Activated Profiles</span>
              </div>
            }
          >
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Post Date</TableCell>
              <TableCell>Activated At</TableCell>
              <TableCell>Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.post_id}>
                <TableCell>{profile.post_id}</TableCell>
                <TableCell>{profile.post_title}</TableCell>
                <TableCell>{profile.post_status}</TableCell>
                <TableCell>{profile.post_author}</TableCell>
                <TableCell>{profile.post_date}</TableCell>
                <TableCell>{profile.activated_at}</TableCell>
                <TableCell>{profile.expires_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </MainCard>
  );
};

export default ActivatedProfiles;
