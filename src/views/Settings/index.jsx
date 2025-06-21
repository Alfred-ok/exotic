import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import PlatformManager from './PlatformManager';
import RegisterPlatformUser from './RegisterPlatformUser';

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <MainCard title="Settings">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
          <Tab label="Platforms" />
          <Tab label="User Registration" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <PlatformManager/>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
       <RegisterPlatformUser/>
      </TabPanel>
    </MainCard>
  );
}

// TabPanel component (optional helper for clarity)
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}
