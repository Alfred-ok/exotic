import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Pagination, Tabs, Tab
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

import MainCard from 'ui-component/cards/MainCard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { zoomies } from 'ldrs'

//icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CancelIcon from '@mui/icons-material/Cancel';
import PaidIcon from '@mui/icons-material/Paid'; // Optional: for total amount

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


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
  const [filters, setFilters] = useState({
    id: '',
    userId: '',
    phone: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const rowsPerPage = 5;
  zoomies.register();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.exoticnairobi.com/api/payments')
      .then(res => res.json())
      .then(data => {
        const transformed = data.payments.map(p => ({
          id: `P${p.payment_id}`,
          userId: `U${p.user_id}`,
          phone: p.phone,
          amount: parseFloat(p.amount),
          product: p.product,
          status: p.status,
          ref: p.transaction_reference || 'N/A',
          date: p.created_at.split(' ')[0]
        }));
        setPayments(transformed);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching payments:', err));
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };
  const filteredPayments = payments.filter(payment =>
    (!filters.id || payment.id.toLowerCase().includes(filters.id.toLowerCase())) &&
    (!filters.userId || payment.userId.toLowerCase().includes(filters.userId.toLowerCase())) &&
    (!filters.phone || payment.phone.includes(filters.phone)) &&
    (!filters.status || payment.status.toLowerCase().includes(filters.status.toLowerCase())) &&
    (!filters.dateFrom || new Date(payment.date) >= new Date(filters.dateFrom)) &&
    (!filters.dateTo || new Date(payment.date) <= new Date(filters.dateTo))
  );


  const paginatedPayments = filteredPayments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleExportPDF = () => {
    exportToPDF(filteredPayments, ['id', 'userId', 'phone', 'amount', 'product', 'status', 'ref', 'date'], 'Payments');
  };

  const handleExportExcel = () => {
    exportToExcel(filteredPayments, 'Payments');
  };

  return (
    <MainCard 
      sx={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' // or keep the same value to prevent disappearing
              }
            }}
      title={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '20px 16px',
              borderRadius: '8px'
            }}
            >
              <AssessmentIcon />
              <span>Payment Reports</span>
            </div>
            
          }
      >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "20px", margin: "0px auto", backgroundColor: 'rgb(240, 242, 246)' }}>
          <l-zoomies
            size="300"
            speed="1.5"
            color="rgb(59, 130, 246)"
          ></l-zoomies>
        </div>
      ) : (
       <> 
    <Box>
      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} sx={{ mb: 2 }}>
        <Tab label="Table View" />
        <Tab label="Chart View" />
      </Tabs>
      

      {tabIndex === 0 && (
        <>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:"25px", marginBottom:"20px" }}>
          <Box mb={2}>
            <Button variant="contained" color="primary" style={{marginRight:"8px"}}><strong>Total Records : </strong> {filteredPayments.length} </Button>
           <Button
              variant="contained"
              style={{ marginRight: "8px", backgroundColor: '#2e7d32' }}
              startIcon={<CheckCircleIcon />}
            >
              <strong>Success : </strong> KES {filteredPayments
                .filter(p => p.status.toLowerCase() === 'success')
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </Button>

            <Button
              variant="contained"
              style={{ marginRight: "8px", backgroundColor: '#f9a825' }}
              startIcon={<HourglassTopIcon />}
            >
              <strong>Pending : </strong> KES {filteredPayments
                .filter(p => p.status.toLowerCase() === 'pending')
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </Button>

            <Button
              variant="contained"
              style={{ marginRight: "8px", backgroundColor: '#c62828' }}
              startIcon={<CancelIcon />}
            >
              <strong>Failed : </strong> KES {filteredPayments
                .filter(p => p.status.toLowerCase() === 'failed')
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "8px" }}
              startIcon={<PaidIcon />}
            >
              <strong>Total : </strong> KES {filteredPayments
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}
            </Button>
          </Box>
          
        </div>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={2}><TextField label="Payment ID" size="small" fullWidth value={filters.id || ''} onChange={(e) => handleFilterChange('id', e.target.value)} /></Grid>
            <Grid item xs={2}><TextField label="User ID" size="small" fullWidth value={filters.userId || ''} onChange={(e) => handleFilterChange('userId', e.target.value)} /></Grid>
            <Grid item xs={2}><TextField label="Phone" size="small" fullWidth value={filters.phone || ''} onChange={(e) => handleFilterChange('phone', e.target.value)} /></Grid>
            <Grid item xs={2}><TextField label="Status" size="small" fullWidth value={filters.status || ''} onChange={(e) => handleFilterChange('status', e.target.value)} /></Grid>
            {/*<Grid item xs={2}><TextField label="Date" size="small" fullWidth value={filters.date || ''} onChange={(e) => handleFilterChange('date', e.target.value)} placeholder="YYYY-MM-DD" /></Grid>*/}
            <Grid item xs={2}>
              <TextField
                label="From Date"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="To Date"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </Grid>

          </Grid>
          <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
          <Box display="flex" gap={2} mb={2}>
            <Button
              variant="contained"
              onClick={handleExportExcel}
              startIcon={<FileDownloadIcon />}
            >
              Export Excel
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleExportPDF}
              startIcon={<PictureAsPdfIcon />}
            >
              Export PDF
            </Button>
          </Box>
          </div>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell style={{ color: '#fff' }}>Payment ID</TableCell>
                  <TableCell style={{ color: '#fff' }}>User ID</TableCell>
                  <TableCell style={{ color: '#fff' }}>Phone</TableCell>
                  <TableCell style={{ color: '#fff' }}>Amount</TableCell>
                  <TableCell style={{ color: '#fff' }}>Product</TableCell>
                  <TableCell style={{ color: '#fff' }}>Status</TableCell>
                  <TableCell style={{ color: '#fff' }}>Reference</TableCell>
                  <TableCell style={{ color: '#fff' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPayments.map((pay, index) => (
                  <TableRow key={pay.id} sx={{ backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff' }}>
                    <TableCell>{pay.id}</TableCell>
                    <TableCell>{pay.userId}</TableCell>
                    <TableCell>{pay.phone}</TableCell>
                    <TableCell>{pay.amount}</TableCell>
                    {/* Product with background color */}
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            pay.product == 'vip'
                              ? '#e3f2fd'
                              : pay.product == 'premium'
                              ? '#f3e5f5'
                              : pay.product == 'basic'
                              ? '#e8f5e9'
                              : '#e0e0e0',
                          color:
                            pay.product == 'vip'
                              ? '#0d47a1'
                              : pay.product == 'premium'
                              ? '#6a1b9a'
                              : pay.product == 'basic'
                              ? '#2e7d32'
                              : '#333',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px',
                          display: 'inline-block',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize'
                        }}
                      >
                        {pay.product}
                      </Box>
                    </TableCell>
                    {/* Status with background color */}
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            pay.status === 'success'
                              ? '#d4edda'
                              : pay.status === 'pending'
                              ? '#fff3cd'
                              : pay.status === 'failed'
                              ? '#f8d7da'
                              : '#e0e0e0',
                          color:
                            pay.status === 'success'
                              ? '#155724'
                              : pay.status === 'pending'
                              ? '#856404'
                              : pay.status === 'failed'
                              ? '#721c24'
                              : '#333',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '12px',
                          display: 'inline-block',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize'
                        }}
                      >
                        {pay.status}
                      </Box>
                    </TableCell>
                    <TableCell>{pay.ref}</TableCell>
                    <TableCell>{pay.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredPayments.length / rowsPerPage)}
              page={currentPage}
              onChange={(e, val) => setCurrentPage(val)}
              color="primary"
            />
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
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#1976d2"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
     </> 
    )}
    </MainCard>
  );
}
