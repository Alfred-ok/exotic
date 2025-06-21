import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
//import UsersTable from './EscortPostsTable';
import EscortPostsTable from './EscortPostsTable';
import PaymentsTable from './PaymentsTable';
import PackagesTable from './PackagesTable';
import MainCard from 'ui-component/cards/MainCard'; // your existing card wrapper

export default function Reports() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <MainCard title="Reports">
      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} sx={{ mb: 3 }}>
        <Tab label="Users" />
        <Tab label="Payments" />
        <Tab label="Packages" />
      </Tabs>

      <Box hidden={tabIndex !== 0}>
        {tabIndex === 0 && <EscortPostsTable />}
      </Box>

      <Box hidden={tabIndex !== 1}>
        {tabIndex === 1 && <PaymentsTable />}
      </Box>

      <Box hidden={tabIndex !== 2}>
        {tabIndex === 2 && <PackagesTable />}
      </Box>

      {tabIndex > 2 && (
        <Typography variant="body2" color="textSecondary">
          No content available.
        </Typography>
      )}
    </MainCard>
  );
}
 