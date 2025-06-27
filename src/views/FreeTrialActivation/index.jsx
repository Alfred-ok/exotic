import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// material-ui
import {
  Typography,
  Button,
  CircularProgress,
  Stack,
  TextField
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function FreeTrialActivation() {
  const [postId, setPostId] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);

  const handleActivateTrial = async () => {
    if (!postId || !days) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter both Post ID and number of days.'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://api.exoticnairobi.com/api/activate-profile', {
        post_id: parseInt(postId),
        days: parseInt(days)
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        html: `
          <p>${response.data.message}</p>
          <p><strong>Post ID:</strong> ${response.data.post_id}</p>
          <p><strong>Expires At:</strong> ${response.data.expires_at}</p>
        `
      });

      setPostId('');
      setDays('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Activation Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

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
            <span>Free Trial Activation</span>
          </div>
        }
      sx={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' // or keep the same value to prevent disappearing
            }
          }}
      >
      <Stack spacing={3}>
        <Typography variant="body2">
          Enter the Escort Post ID and number of trial days to activate the free trial.
        </Typography>

        <TextField
          label="Post ID"
          variant="outlined"
          type="number"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          fullWidth
        />

        <TextField
          label="Days"
          variant="outlined"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleActivateTrial}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Activate Free Trial'}
        </Button>
      </Stack>
    </MainCard>
  );
}
