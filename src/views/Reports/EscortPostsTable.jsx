/*
import React, { useState, useEffect } from 'react';
import {
  Grid, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Pagination, Box, TableSortLabel, Button, Tabs, Tab
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AreaChart, Area } from 'recharts';
import axios from 'axios';

// Table headers
const escortTableHeaders = [
  { id: 'id', label: 'Post ID' },
  { id: 'name', label: 'Escort Name' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'status', label: 'Post Status' },
  { id: 'registered', label: 'Post Date' }
];


// Status options
const userStatusOptions = [
  { value: '', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Deactivated', label: 'Deactivated' },
  { value: 'VIP', label: 'VIP' },
  { value: 'Premium', label: 'Premium' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Free Trial', label: 'Free Trial' }
];

// Sample Kenyan names
const kenyanNames = [
  'Brian Otieno', 'Faith Mwangi', 'John Kariuki', 'Mercy Achieng', 'David Njoroge',
  'Linda Wambui', 'Peter Ouma', 'Alice Muthoni', 'Samuel Kimani', 'Rose Atieno',
  'Michael Mutua', 'Esther Naliaka', 'Collins Kiptoo', 'Janet Cherono', 'Kevin Odhiambo',
  'Agnes Chebet', 'George Nyambura', 'Cynthia Kilonzo', 'Paul Mwende', 'Lucy Wanjiku'
];

// Generate 20 sample users with Kenyan names
const generateSampleUsers = () => {
  const statuses = ['Active', 'Deactivated', 'VIP', 'Premium', 'Basic', 'Free Trial'];
  return kenyanNames.map((name, index) => {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
    return {
      id: `U${1000 + index + 1}`,
      name,
      email,
      phone: `+2547${Math.floor(10000000 + Math.random() * 89999999)}`,
      status: randomStatus,
      registered: `2025-06-${String(index + 1).padStart(2, '0')}`
    };
  });
};

// Export PDF function
const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.text("User List", 14, 15);
  const tableColumn = userTableHeaders.map(header => header.label);
  const tableRows = data.map(user => [
    user.id, user.name, user.email, user.phone, user.status, user.registered
  ]);
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20
  });
  doc.save("users.pdf");
};

// Export Excel function
const exportToExcel = (data) => {
  const worksheetData = data.map(user => ({
    'User ID': user.id,
    'Full Name': user.name,
    'Email': user.email,
    'Phone': user.phone,
    'Status': user.status,
    'Registered Date': user.registered
  }));
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, "users.xlsx");
};

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    id: '', name: '', email: '', phone: '', status: '', registered: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [innerTab, setInnerTab] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
  axios.post('https://api.exoticnairobi.com/api/escort-posts', { platform_id: 1 })
    .then(response => {
      setUsers(response.data.escort_posts.map((post, i) => ({
        id: `P${post.ID}`,
        name: post.post_title,
        email: post.post_name + '@exoticnairobi.com', // placeholder
        phone: post.phone_number,
        status: post.post_status,
        registered: post.post_date.split(' ')[0]
      })));
    })
    .catch(err => console.error('Error fetching escort posts', err));
}, []);


  let filteredUsers = [...users].filter(user => (
    (!filters.id || user.id.toLowerCase().includes(filters.id.toLowerCase())) &&
    (!filters.name || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
    (!filters.phone || user.phone.includes(filters.phone)) &&
    (!filters.status || user.status === filters.status) &&
    (!filters.registered || user.registered.includes(filters.registered))
  ));

  if (sortConfig.key) {
    filteredUsers.sort((a, b) => {
      const aVal = a[sortConfig.key].toString().toLowerCase();
      const bVal = b[sortConfig.key].toString().toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnId, direction });
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const chartData = userStatusOptions
    .filter(option => option.value !== '')
    .map(option => ({
      status: option.value,
      count: users.filter(user => user.status === option.value).length
    }));

  return (
    <>
      <Box mb={2}>
        <Tabs value={innerTab} onChange={(e, val) => setInnerTab(val)}>
          <Tab label="Table View" />
          <Tab label="Chart View" />
        </Tabs>
      </Box>

      {innerTab === 0 ? (
        <>
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}><TextField label="User ID" size="small" fullWidth value={filters.id} onChange={(e) => handleFilterChange('id', e.target.value)} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Full Name" size="small" fullWidth value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Email" size="small" fullWidth value={filters.email} onChange={(e) => handleFilterChange('email', e.target.value)} /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Phone" size="small" fullWidth value={filters.phone} onChange={(e) => handleFilterChange('phone', e.target.value)} /></Grid>
              <Grid item xs={12} sm={2}>
                <TextField select label="Status" size="small" fullWidth value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                  {userStatusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}><TextField label="Registered Date" size="small" fullWidth value={filters.registered} onChange={(e) => handleFilterChange('registered', e.target.value)} placeholder="YYYY-MM-DD" /></Grid>
            </Grid>
          </Box>

          <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="secondary" onClick={() => exportToPDF(filteredUsers)}>Export PDF</Button>
            <Button variant="contained" color="primary" onClick={() => exportToExcel(filteredUsers)}>Export Excel</Button>
          </Box>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  {userTableHeaders.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{ color: '#fff', fontWeight: 'bold' }}
                    >
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
                {paginatedUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#ffffff'
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.registered}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={Math.ceil(filteredUsers.length / rowsPerPage)} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" />
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
            <Area
            type="monotone"
            dataKey="count"
            stroke="#1976d2"
            fill="#90caf9"
            strokeWidth={3}
            />
        </AreaChart>
        </ResponsiveContainer>

      )}
    </>
  );
}
*/

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
