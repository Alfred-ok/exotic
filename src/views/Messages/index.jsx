
/*
// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Messages() {
  return (
    <MainCard title="Messages">
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
import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const sampleMessages = [
  { userId: 'user1', messageContent: 'Hello, how are you?', date: '2025-05-01', time: '10:00 AM', remainingMessages: 20 },
  { userId: 'user2', messageContent: 'Your order has been shipped!', date: '2025-05-02', time: '12:30 PM', remainingMessages: 15 },
  { userId: 'user3', messageContent: 'Please verify your email.', date: '2025-05-03', time: '3:45 PM', remainingMessages: 30 },
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(sampleMessages);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterMessages(event.target.value);
  };

  const filterMessages = (searchQuery) => {
    if (!searchQuery) {
      setFilteredMessages(sampleMessages);
    } else {
      const filtered = sampleMessages.filter(
        (message) =>
          message.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.messageContent.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  return (
    <MainCard title="Sent Messages">
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search Messages"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Message Content</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Remaining Messages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message, index) => (
                  <TableRow key={index}>
                    <TableCell>{message.userId}</TableCell>
                    <TableCell>{message.messageContent}</TableCell>
                    <TableCell>{message.date}</TableCell>
                    <TableCell>{message.time}</TableCell>
                    <TableCell>{message.remainingMessages}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No messages found.
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

Messages.propTypes = {
  isLoading: PropTypes.bool,
};

export default Messages;

