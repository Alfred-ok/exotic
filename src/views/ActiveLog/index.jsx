import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Pagination,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import dayjs from 'dayjs';

const ActiveLog = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Date filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // API call
  const fetchLogs = async (page = 1) => {
  setLoading(true);
  try {
    const params = {
      current_page: page,
      ...(startDate && { start_date: dayjs(startDate).format('YYYY-MM-DD') }),
      ...(endDate && { end_date: dayjs(endDate).format('YYYY-MM-DD') })
    };

    const res = await axios.get('https://api.exoticnairobi.com/api/activity-logs', { params });
    const data = res.data;

    setLogs(data.data);
    setFilteredLogs(data.data);
    setTotalPages(data.last_page || 1);
    setCurrentPage(data.current_page || 1);
  } catch (err) {
    setError('Failed to fetch activity logs');
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    const filtered = logs.filter((log) =>
      JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [searchTerm, logs]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchLogs(page);
  };

  const handleFilter = () => {
    fetchLogs(1);
  };

  const formatDetails = (log) => {
    if (log.payload) {
      return Object.entries(log.payload)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');
    }
    return '-';
  };

  console.log(logs);

  return (
    <MainCard title="Activity Log">
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search Activities"
            fullWidth
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </Grid>
        <Grid item xs={6} sm={2}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={handleFilter}
            disabled={loading}
          >
            Filter
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container justifyContent="center" sx={{ my: 5 }}>
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
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
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.user?.name || 'Anonymous'}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                    <TableCell>{formatDetails(log)}</TableCell>
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

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </>
      )}
    </MainCard>
  );
};

export default ActiveLog;
