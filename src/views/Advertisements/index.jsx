/*
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Advertisements() {
  return (
    <MainCard title="Advertisements">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
  );
}
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui components
import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Switch, FormControlLabel, TextField, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'paused', label: 'Paused' },
];

const advertisementData = [
  { adTitle: 'Summer Sale', duration: '1st June - 30th June', status: 'active', amountPaid: '$500' },
  { adTitle: 'Black Friday Deals', duration: '1st Nov - 30th Nov', status: 'paused', amountPaid: '$1200' },
  { adTitle: 'Winter Special', duration: '15th Dec - 15th Jan', status: 'inactive', amountPaid: '$800' },
];

const Advertisement = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSwitchChange = () => {
    setIsActive(!isActive);
  };

  const filteredAds = statusFilter
    ? advertisementData.filter((ad) => ad.status === statusFilter)
    : advertisementData;

  return (
    <MainCard title="Advertisements">
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Filter by Status"
            value={statusFilter}
            onChange={handleStatusChange}
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Switch checked={isActive} onChange={handleSwitchChange} />}
            label={isActive ? 'Show Active Ads Only' : 'Show All Ads'}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ad Title</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAds.map((ad, index) => (
                <TableRow key={index}>
                  <TableCell>{ad.adTitle}</TableCell>
                  <TableCell>{ad.duration}</TableCell>
                  <TableCell>{ad.status}</TableCell>
                  <TableCell>{ad.amountPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </MainCard>
  );
};

Advertisement.propTypes = {
  isLoading: PropTypes.bool,
};

export default Advertisement;

