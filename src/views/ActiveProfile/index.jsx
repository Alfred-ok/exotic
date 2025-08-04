import React, { useState } from 'react';
import Profiles from './Profiles';
import MainCard from './MainCard'; // Assuming this is a custom wrapper
import { Tabs, Tab, Box } from '@mui/material';
import Deactive from './Deactive'

function ActiveProfile() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <MainCard
      sx={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '20px 16px',
            borderRadius: '8px',
          }}
        >
          <span>Profiles</span>
        </div>
      }
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Free Trials" />
          <Tab label="Deactivate" />
        </Tabs>
      </Box>

      {activeTab === 0 && <Deactive/>}
      {activeTab === 1 && <Profiles />}
    </MainCard>
  );
}

export default ActiveProfile;
