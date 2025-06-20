

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableSortLabel, TextField, Pagination, Tabs, Tab
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const escortStatusOptions = [
  { value: '', label: 'All' },
  { value: 'publish', label: 'Published' },
  { value: 'private', label: 'Private' }
];

const escortHeaders = [
  { id: 'id', label: 'Post ID' },
  { id: 'name', label: 'Escort Name' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'status', label: 'Post Status' },
  { id: 'registered', label: 'Post Date' }
];

const EscortPostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ id: '', name: '', phone: '', status: '', registered: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [viewTab, setViewTab] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    axios.post('https://api.exoticnairobi.com/api/escort-posts', { platform_id: 1 })
      .then(res => {
        const escortData = res.data.escort_posts.map(post => ({
          id: `P${post.ID}`,
          name: post.post_title,
          phone: post.phone_number,
          status: post.post_status,
          registered: post.post_date.split(' ')[0]
        }));
        setPosts(escortData);
      })
      .catch(err => console.error('Failed to fetch escort posts:', err));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  let filteredPosts = posts.filter(post =>
    (!filters.id || post.id.toLowerCase().includes(filters.id.toLowerCase())) &&
    (!filters.name || post.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.phone || post.phone.includes(filters.phone)) &&
    (!filters.status || post.status === filters.status) &&
    (!filters.registered || post.registered.includes(filters.registered))
  );

  if (sortConfig.key) {
    filteredPosts.sort((a, b) => {
      const aVal = a[sortConfig.key]?.toString().toLowerCase();
      const bVal = b[sortConfig.key]?.toString().toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key: columnId, direction });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Escort Posts', 14, 15);
    doc.autoTable({
      head: [escortHeaders.map(h => h.label)],
      body: filteredPosts.map(post => [post.id, post.name, post.phone, post.status, post.registered]),
      startY: 20
    });
    doc.save('escort-posts.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPosts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'EscortPosts');
    XLSX.writeFile(workbook, 'escort-posts.xlsx');
  };

  const chartData = escortStatusOptions
    .filter(option => option.value)
    .map(option => ({
      status: option.label,
      count: posts.filter(p => p.status === option.value).length
    }));

  return (
    <>
      <Box mb={2}>
        <Tabs value={viewTab} onChange={(e, val) => setViewTab(val)}>
          <Tab label="Table View" />
          <Tab label="Chart View" />
        </Tabs>
      </Box>

      {viewTab === 0 ? (
        <>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6} sm={2}><TextField label="Post ID" size="small" fullWidth value={filters.id} onChange={e => handleFilterChange('id', e.target.value)} /></Grid>
            <Grid item xs={6} sm={2}><TextField label="Escort Name" size="small" fullWidth value={filters.name} onChange={e => handleFilterChange('name', e.target.value)} /></Grid>
            <Grid item xs={6} sm={2}><TextField label="Phone Number" size="small" fullWidth value={filters.phone} onChange={e => handleFilterChange('phone', e.target.value)} /></Grid>
            <Grid item xs={6} sm={2}>
              <TextField select label="Post Status" size="small" fullWidth value={filters.status} onChange={e => handleFilterChange('status', e.target.value)}>
                {escortStatusOptions.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={2}><TextField label="Post Date" size="small" fullWidth value={filters.registered} onChange={e => handleFilterChange('registered', e.target.value)} placeholder="YYYY-MM-DD" /></Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <Button variant="contained" color="secondary" onClick={exportToPDF}>Export PDF</Button>
            <Button variant="contained" color="primary" onClick={exportToExcel}>Export Excel</Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  {escortHeaders.map(header => (
                    <TableCell key={header.id} sx={{ color: '#fff', fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={sortConfig.key === header.id}
                        direction={sortConfig.key === header.id ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort(header.id)}
                        sx={{ color: '#fff' }}
                      >
                        {header.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPosts.map((post, idx) => (
                  <TableRow key={post.id} sx={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.phone}</TableCell>
                    <TableCell>{post.status}</TableCell>
                    <TableCell>{post.registered}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredPosts.length / rowsPerPage)}
              page={currentPage}
              onChange={(e, val) => setCurrentPage(val)}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="count" stroke="#1976d2" fill="#90caf9" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default EscortPostsTable;
