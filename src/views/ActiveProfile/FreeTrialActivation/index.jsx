/*
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
 
  // Constant product map
  const productMap = {
    VIP: 1,
    premium: 2,
    basic: 3
  };
  const navigate = useNavigate();

  const location = useLocation();
  const { id } = location.state || {}; // id passed via navigate

  // Pre-fill postId when component mounts
  useEffect(() => {
  if (id) {
      const numericId = id.replace(/\D/g, ''); // removes all non-digits (e.g., "P120" → "120")
      setPostId(numericId);
    }
  }, [id]);

  console.log(id);

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
        days: parseInt(days),
        product_id: 1,
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
      navigate('/ActivatedProfile');
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

         <TextField
          label="Product"
          select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          fullWidth
        >
          {Object.keys(productMap).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </TextField>

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
*/



import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import {
  Typography,
  Button,
  CircularProgress,
  Stack,
  TextField,
  MenuItem
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CampaignIcon from '@mui/icons-material/Campaign';

// Constant product map
const productMap = {
  VIP: 1,
  premium: 2,
  basic: 3
};

export default function FreeTrialActivation() {
  const [postId, setPostId] = useState('');
  const [days, setDays] = useState('');
  const [selectedProduct, setSelectedProduct] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (id) {
      const numericId = id.replace(/\D/g, '');
      setPostId(numericId);
    }
  }, [id]);

  const handleActivateTrial = async () => {
    if (!postId || !days) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter Post ID, number of days, and product.'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://api.exoticnairobi.com/api/activate-profile', {
        post_id: parseInt(postId),
        days: parseInt(days),
        product_id: productMap[selectedProduct]
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
      navigate('/ActivatedProfile');
      setPostId('');
      setDays('');
      setSelectedProduct('VIP');
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
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <Stack spacing={3}>
        <Typography variant="body2">
          Enter the Escort Post ID, product type, and trial days to activate.
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

        <TextField
          label="Product"
          select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          fullWidth
        >
          {Object.keys(productMap).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </TextField>

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


