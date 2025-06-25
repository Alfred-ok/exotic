/*
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router';

import { gridSpacing } from 'store/constant';
import Country from './Country';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
//import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';


export default function PlatformSelector() {
  const [isLoading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const data = [
    { id: 1, country: "Kenya Exotic Websites", totalsite: "1" },
    { id: 2, country: "Uganda Exotic Websites", totalsite: "0" },
    { id: 3, country: "Tanzania Exotic Websites", totalsite: "0" },
    { id: 4, country: "Nigeria Exotic Websites", totalsite: "0" },
  ];

  useEffect(() => {
    // Simulate initial load delay (can be removed if not needed)
    const timer = setTimeout(() => setGlobalLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCountryClick = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.exoticnairobi.com/api/dashboard-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform_id: id }),
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const result = await response.json();

      if (result?.platform === "Exotic Nairobi") {
        navigate("/dashboard/default");
      } else {
        setError("Platform not supported or data unavailable.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      console.error("API error:", err);
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
          backgroundColor: theme.palette.secondary[800],
          color: 'white',
          padding: '20px 16px',
          borderRadius: '8px'
        }}>
          <PublicIcon/>
          <span>Platform Selector</span>
        </div>
      }
    >
      <Typography variant="body2" style={{ padding: "15px" }}>
        Select a Country to Explore Available Sites
      </Typography>

      {globalLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading platforms...</Typography>
        </div>
      ) : (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              {data.map((dat) => (
                <Grid item key={dat.id} lg={3} md={6} sm={6} xs={12}>
                  <div
                    onClick={() => !isLoading && handleCountryClick(dat.id)}
                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}
                  >
                    <Country isLoading={false} dat={dat} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}


      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </MainCard>
  );
}
*/


import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import Swal from 'sweetalert2';

import { gridSpacing } from 'store/constant';
import Country from './Country';
import MainCard from 'ui-component/cards/MainCard';

export default function PlatformSelector() {
  const [isLoading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  const data = [
    { id: 1, country: "Kenya Exotic Websites", totalsite: "1" },
    { id: 2, country: "Uganda Exotic Websites", totalsite: "0" },
    { id: 3, country: "Tanzania Exotic Websites", totalsite: "0" },
    { id: 4, country: "Nigeria Exotic Websites", totalsite: "0" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setGlobalLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCountryClick = async (id) => {
    setLoading(true);

    try {
      const response = await fetch('https://api.exoticnairobi.com/api/dashboard-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform_id: id }),
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const result = await response.json();

      if (result?.platform === "Exotic Nairobi") {
        navigate("/dashboard/default");
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Unsupported Platform',
          text: 'Platform not supported or data unavailable.'
        });
      }
    } catch (err) {
      console.error("API error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Connection Failed',
        text: 'Failed to connect to the server. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

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
          backgroundColor: theme.palette.secondary[800],
          color: 'white',
          padding: '20px 16px',
          borderRadius: '8px'
        }}>
          <PublicIcon />
          <span>Platform Selector</span>
        </div>
      }
    >
      <Typography variant="body2" style={{ padding: "15px" }}>
        Select a Country to Explore Available Sites
      </Typography>

      {globalLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading platforms...</Typography>
        </div>
      ) : (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              {data.map((dat) => (
                <Grid item key={dat.id} lg={3} md={6} sm={6} xs={12}>
                  <div
                    onClick={() => !isLoading && handleCountryClick(dat.id)}
                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}
                  >
                    <Country isLoading={false} dat={dat} />
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
}
