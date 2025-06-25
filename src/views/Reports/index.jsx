import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
//import UsersTable from './EscortPostsTable';
import EscortPostsTable from './EscortPostsTable';
import PaymentsTable from './PaymentsTable';
import PackagesTable from './PackagesTable';
import MainCard from 'ui-component/cards/MainCard'; // your existing card wrapper
import AssessmentIcon from '@mui/icons-material/Assessment';


export default function Reports() {
  const [tabIndex, setTabIndex] = useState(0);
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
      <AssessmentIcon />
      <span>Reports</span>
    </div>
  }
    >
      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} sx={{ mb: 3 }}>
        <Tab label="Users" />
        <Tab label="Payments" />
      </Tabs>

      <Box hidden={tabIndex !== 0}>
        {tabIndex === 0 && <EscortPostsTable />}
      </Box>

      <Box hidden={tabIndex !== 1}>
        {tabIndex === 1 && <PaymentsTable />}
      </Box>

      {tabIndex > 2 && (
        <Typography variant="body2" color="textSecondary">
          No content available.
        </Typography>
      )}
    </MainCard>
  );
}
 

