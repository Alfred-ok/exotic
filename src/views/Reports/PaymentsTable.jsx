import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Pagination, Tabs, Tab
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Generate Kenyan names
const kenyanNames = [
  'Brian Otieno', 'Faith Mwangi', 'John Kariuki', 'Mercy Achieng', 'David Njoroge',
  'Linda Wambui', 'Peter Ouma', 'Alice Muthoni', 'Samuel Kimani', 'Rose Atieno',
  'Michael Mutua', 'Esther Naliaka', 'Collins Kiptoo', 'Janet Cherono', 'Kevin Odhiambo',
  'Agnes Chebet', 'George Nyambura', 'Cynthia Kilonzo', 'Paul Mwende', 'Lucy Wanjiku'
];

// Generate Payments
const generatePayments = () => {
  return kenyanNames.map((name, index) => ({
    id: `P${2000 + index}`,
    userId: `U${1000 + index}`,
    name,
    amount: Math.floor(100 + Math.random() * 900),
    date: `2025-06-${String(index + 1).padStart(2, '0')}`
  }));
};

const exportToPDF = (data, headers, fileName) => {
  const doc = new jsPDF();
  doc.text(fileName, 14, 15);
  doc.autoTable({
    head: [headers],
    body: data.map(row => headers.map(h => row[h])),
    startY: 20
  });
  doc.save(`${fileName}.pdf`);
};

const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    setPayments(generatePayments());
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const filteredPayments = payments.filter(payment =>
    (!filters.id || payment.id.toLowerCase().includes(filters.id.toLowerCase())) &&
    (!filters.userId || payment.userId.toLowerCase().includes(filters.userId.toLowerCase())) &&
    (!filters.name || payment.name.toLowerCase().includes(filters.name.toLowerCase()))
  );

  const paginatedPayments = filteredPayments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleExportPDF = () => {
    exportToPDF(filteredPayments, ['id', 'userId', 'name', 'amount', 'date'], 'Payments');
  };

  const handleExportExcel = () => {
    exportToExcel(filteredPayments, 'Payments');
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} sx={{ mb: 2 }}>
        <Tab label="Table View" />
        <Tab label="Bar Chart View" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <Button variant="contained" onClick={handleExportExcel}>Export Excel</Button>
            <Button variant="contained" color="secondary" onClick={handleExportPDF}>Export PDF</Button>
          </Box>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={3}><TextField label="Payment ID" size="small" fullWidth value={filters.id || ''} onChange={(e) => handleFilterChange('id', e.target.value)} /></Grid>
            <Grid item xs={3}><TextField label="User ID" size="small" fullWidth value={filters.userId || ''} onChange={(e) => handleFilterChange('userId', e.target.value)} /></Grid>
            <Grid item xs={3}><TextField label="Name" size="small" fullWidth value={filters.name || ''} onChange={(e) => handleFilterChange('name', e.target.value)} /></Grid>
          </Grid>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2', color:"#fff" }}>
                <TableRow  sx={{ color: '#fff', fontWeight: 'bold' }}>
                  <TableCell style={{color:"#fff"}}>Payment ID</TableCell>
                  <TableCell style={{color:"#fff"}}>User ID</TableCell>
                  <TableCell style={{color:"#fff"}}>Name</TableCell>
                  <TableCell style={{color:"#fff"}}>Amount (USD)</TableCell>
                  <TableCell style={{color:"#fff"}}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPayments.map((pay, index) => (
                  <TableRow key={pay.id} sx={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff' }}>
                    <TableCell>{pay.id}</TableCell>
                    <TableCell>{pay.userId}</TableCell>
                    <TableCell>{pay.name}</TableCell>
                    <TableCell>{pay.amount}</TableCell>
                    <TableCell>{pay.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={Math.ceil(filteredPayments.length / rowsPerPage)} page={currentPage} onChange={(e, val) => setCurrentPage(val)} color="primary" />
          </Box>
        </>
      )}

     {tabIndex === 1 && (
        <Box height={400} width="100%">
          <ResponsiveContainer>
            <AreaChart data={filteredPayments} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amount" stroke="#1976d2" fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}

    </Box>
  );
}
