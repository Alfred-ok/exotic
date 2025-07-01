/*
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
  const [platforms, setPlatforms] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
  const fetchPlatforms = async () => {
    try {
      const response = await fetch('https://api.exoticnairobi.com/api/platforms');
      if (!response.ok) throw new Error('Failed to fetch platforms');

      const result = await response.json();
      console.log(result);

      if (result.status === 200 && Array.isArray(result.platforms)) {
        // Count Kenyan platforms
        const kenyaPlatforms = result.platforms.filter(p => p.country === 'Kenya');
        const kenyaCount = kenyaPlatforms.length;

        // Map data with `totalsite` for Kenya only
        const formatted = result.platforms.map((p) => ({
          id: p.id,
          name: p.name,
          domain: p.domain,
          country: p.country,
          totalsite: p.country === 'Kenya' ? kenyaCount : 0
        }));

        setPlatforms(formatted);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid data received from server.'
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Failed to fetch platforms. Please try again later.'
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  fetchPlatforms();
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

      if (result?.platform) {
        localStorage.setItem('platform', result.platform);
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

  console.log(platforms);

  return (
    <MainCard
      sx={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
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
              {platforms.map((platform) => (
                <Grid item key={platform.id} lg={3} md={6} sm={6} xs={12}>
                  <div
                    onClick={() => !isLoading && handleCountryClick(platform.id)}
                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}
                  >
                    <Country isLoading={false} dat={platform} />
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

*/






import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Box
} from '@mui/material';
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
  const [platforms, setPlatforms] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Kenya');

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch('https://api.exoticnairobi.com/api/platforms');
        if (!response.ok) throw new Error('Failed to fetch platforms');

        const result = await response.json();
        if (result.status === 200 && Array.isArray(result.platforms)) {
          const kenyaCount = result.platforms.filter(p => p.country === 'Kenya').length;

          const formatted = result.platforms.map((p) => ({
            id: p.id,
            name: p.name,
            domain: p.domain,
            country: p.country,
            totalsite: p.country === 'Kenya' ? kenyaCount : 0
          }));

          setPlatforms(formatted);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid data received from server.'
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Connection Error',
          text: 'Failed to fetch platforms. Please try again later.'
        });
      } finally {
        setGlobalLoading(false);
      }
    };

    fetchPlatforms();
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

      if (result?.platform) {
        localStorage.setItem('platform', result.platform);
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const countries = ['Kenya', 'Nigeria', 'Tanzania', 'South Africa'];

  return (
    <MainCard
      sx={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
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
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: 'white',
              borderRadius: 2,
              mb: 2
            }}
          >
            {countries.map((country) => (
              <Tab
                key={country}
                label={country}
                value={country}
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    //backgroundColor: 'white',
                    borderRadius: 1
                  }
                }}
              />
            ))}
          </Tabs>

          <Grid container spacing={gridSpacing}>
            {platforms
              .filter((p) => p.country === selectedTab)
              .map((platform) => (
                <Grid item key={platform.id} lg={3} md={6} sm={6} xs={12}>
                  <div
                    onClick={() => !isLoading && handleCountryClick(platform.id)}
                    style={{
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.6 : 1
                    }}
                  >
                    <Country isLoading={false} dat={platform} />
                  </div>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </MainCard>
  );
}
