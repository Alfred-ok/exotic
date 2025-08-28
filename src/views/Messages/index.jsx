import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// material-ui components
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  MenuItem
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

const Messages = () => {
  const [smsLogs, setSmsLogs] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    fetchSmsLogs();
  }, []);

  const fetchSmsLogs = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/sms-logs`);
      const logs = response.data.sms_logs || [];
      setSmsLogs(logs);
      setFilteredMessages(logs);
    } catch (error) {
      console.error('Error fetching SMS logs:', error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterMessages(value, statusFilter);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    filterMessages(searchTerm, value);
  };

  const filterMessages = (query, status) => {
    let filtered = smsLogs;

    if (status !== 'all') {
      filtered = filtered.filter((log) => log.status === status);
    }

    if (query) {
      filtered = filtered.filter(
        (log) =>
          log.phone.toLowerCase().includes(query.toLowerCase()) ||
          log.message.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
    setPage(0); // Reset to first page on filter
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            <span>Sent SMS Logs</span>
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
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by Phone or Message"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Filter by Status"
            value={statusFilter}
            onChange={handleStatusChange}
            fullWidth
            size="small"
            variant="outlined"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="sent">Sent</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMessages.length > 0 ? (
            filteredMessages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.phone}</TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.status}
                      color={log.status === 'sent' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Loading messages...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredMessages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

Messages.propTypes = {
  isLoading: PropTypes.bool
};

export default Messages;
