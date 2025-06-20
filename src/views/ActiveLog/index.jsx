/*
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function ActiveLog() {
  return (
    <MainCard title="Active Log">
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

// material-ui components
import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// Sample activity log data
const sampleLogs = [
  {
    user: 'admin01',
    action: 'Logged In',
    timestamp: '2025-05-08 09:23:12',
    details: 'Admin logged into dashboard'
  },
  {
    user: 'john_doe',
    action: 'Sent Message',
    timestamp: '2025-05-08 10:15:45',
    details: 'Message sent to 150 recipients'
  },
  {
    user: 'admin01',
    action: 'Updated Settings',
    timestamp: '2025-05-08 10:47:33',
    details: 'Changed SMS cost from 0.5 to 0.6'
  },
  {
    user: 'jane_doe',
    action: 'Viewed Reports',
    timestamp: '2025-05-08 11:02:11',
    details: 'Accessed Payments report for April'
  }
];

const ActiveLog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = sampleLogs.filter((log) =>
    Object.values(log).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <MainCard title="Activity Log">
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search Activities"
            fullWidth
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
                <TableCell><strong>Timestamp</strong></TableCell>
                <TableCell><strong>Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No activity records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ActiveLog;

