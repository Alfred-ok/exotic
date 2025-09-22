import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Pagination, Tabs, Tab,
  MenuItem,
  Typography
} from '@mui/material';
//import { jsPDF } from 'jspdf';
//import 'jspdf-autotable';
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
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';


import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';




export default function OveralPayment() {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    userId: '',
    phone: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    ref: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  //const rowsPerPage = 5;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  zoomies.register();
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState();

  const [reason, setReason] = useState("");

  //STK push
  const [stkModalOpen, setStkModalOpen] = useState(false);
  const [stkPhone, setStkPhone] = useState('');
  const [stkUserId, setStkUserId] = useState(null);
  const [stkProductId, setStkProductId] = useState(null);


  const platformId = localStorage.getItem('platformId');
  const baseURL = import.meta.env.VITE_APP_BASE_URL;



/*
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
*/

const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

  useEffect(() => {
    setLoading(true);
    //fetch(`https://api.exoticnairobi.com/api/payments?platform_id=${platformId}`)
    fetch(`${baseURL}/api/payments`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.status == "error"){setReason(data.reason)}
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
     (!filters.ref || payment.ref.toLowerCase().includes(filters.ref.toLowerCase())) &&
    (!filters.dateTo || new Date(payment.date) <= new Date(filters.dateTo))
  );


  const paginatedPayments = filteredPayments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
/*
  const handleExportPDF = () => {
    exportToPDF(filteredPayments, ['id', 'userId', 'phone', 'amount', 'product', 'status', 'ref', 'date'], 'Payments');
  };
*/

  const handleExportExcel = () => {
    exportToExcel(filteredPayments, 'Payments');
  };




/*

//STK HANDLE FUNCTION

const handleOpenModal = (productId, postId) => {
  setSelectedProductId(productId);
  //setSelectedPostId(postId);
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedProductId(null);
  setSelectedPostId('');
};
/*
const handleDeactivate = async () => {
  try {
    const res = await fetch('https://api.exoticnairobi.com/api/deactivate-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: selectedPostId,
        product_id: selectedProductId
      })
    });

    const result = await res.json();
    if (res.ok) {
      alert("Deactivated successfully!");
    } else {
      alert("Error: " + result.message || "Failed to deactivate.");
    }
  } catch (error) {
    alert("Network Error: " + error.message);
  } finally {
    handleCloseModal();
  }
};
*/
/*
console.log('pId',selectedPostId, 'productId', selectedProductId);

//STK MODAL OPEN
const handleOpenStkModal = (userId, product) => {
  const productId = product === 'VIP' ? 1 : product === 'premimum' ? 2 : 3;
  setStkUserId(userId);
  setStkProductId(productId);
  setStkModalOpen(true);
};



const handleSendStkPush = async () => {
  try {
    const res = await fetch('https://api.exoticnairobi.com/api/manual-stk-push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: stkProductId,
        platform_id: 1,
        user_id: stkUserId,
        phone: stkPhone,
        duration: 'monthly',
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('STK push sent successfully!');
    } else {
      alert('STK push failed: ' + result.message);
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  } finally {
    setStkModalOpen(false);
    setStkPhone('');
  }
};
*/







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
              <span>Overal Payment Reports</span>
            </div>
            
          }
      >
      {reason && <p style={{textAlign:"center", margin:"10px auto"}}>{reason}</p>}
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
          {/* <Box mb={2}>
            <Button variant="contained" color="primary" style={{marginRight:"8px"}}><strong>Total Records : </strong> {filteredPayments.length} </Button>
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
          </Box> */}


          {/* ===== Payment Summary Cards ===== */}
          <Grid container spacing={2} mt={2} mb={2} style={{backgroundColor:"rgba(220, 220, 220, 0.5)", borderRadius:"15px"}}>

            {/* Total Payments */}
            <Grid item xs={12} sm={6} md={3} style={{padding:"10px"}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    bgcolor:'#1976d2',
                    borderRadius: "12px",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <AutoAwesomeMotionIcon style={{color:"white"}} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total Records
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredPayments.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Total Amount */}
            {/* <Grid item xs={12} sm={6} md={3} style={{padding:"10px"}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    bgcolor:'#e3f2fd',
                    borderRadius: "12px",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <AssessmentIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total Amount
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    KES {filteredPayments
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid> */}

            {/* Success Payments */}
            <Grid item xs={12} sm={6} md={3} style={{padding:"10px"}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    bgcolor:'#e8f5e9',
                    borderRadius: "12px",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <CheckCircleIcon color="success" />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Completed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    KES {filteredPayments
                      .filter(p => p.status.toLowerCase() === 'completed')
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Pending Payments */}
            <Grid item xs={12} sm={6} md={3} style={{padding:"10px"}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    bgcolor:'#fff8e1',
                    borderRadius: "12px",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <HourglassTopIcon color="warning" />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Pending
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    KES {filteredPayments
                      .filter(p => p.status.toLowerCase() === 'pending')
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Failed Payments */}
            <Grid item xs={12} sm={6} md={3} style={{padding:"10px"}}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    bgcolor:'#ffebee',
                    borderRadius: "12px",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <CancelIcon color="error" />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Failed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    KES {filteredPayments
                      .filter(p => p.status.toLowerCase() === 'failed')
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          
        </div>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={2}><TextField label="Payment ID" size="small" fullWidth value={filters.id || ''} onChange={(e) => handleFilterChange('id', e.target.value)} /></Grid>
            <Grid item xs={2}><TextField label="User ID" size="small" fullWidth value={filters.userId || ''} onChange={(e) => handleFilterChange('userId', e.target.value)} /></Grid>
            <Grid item xs={2}><TextField label="Phone" size="small" fullWidth value={filters.phone || ''} onChange={(e) => handleFilterChange('phone', e.target.value)} /></Grid>
            <Grid item xs={2}><TextField label="Status" size="small" fullWidth value={filters.status || ''} onChange={(e) => handleFilterChange('status', e.target.value)} /></Grid>
            {/*<Grid item xs={2}><TextField label="Date" size="small" fullWidth value={filters.date || ''} onChange={(e) => handleFilterChange('date', e.target.value)} placeholder="YYYY-MM-DD" /></Grid>*/}
            <Grid item xs={2}>
              <TextField
                label="Reference"
                size="small"
                fullWidth
                value={filters.ref || ''}
                onChange={(e) => handleFilterChange('ref', e.target.value)}
              />
            </Grid>

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
          </Box>
          </div>

          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} gap={2}>
            <span>Rows per page:</span>
            <TextField
              select
              size="small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // reset to first page
              }}
              sx={{ width: "100px" }}
            >
              {[10, 25, 50, 100].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

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
                 {/* <TableCell style={{ color: '#fff' }}>Action</TableCell>
                  <TableCell style={{ color: '#fff' }}></TableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody>-
                {paginatedPayments.map((pay, index) => (
                  <TableRow key={pay.id} sx={{ 
                      backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff',
                      '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                       } 
                    }}>
                    <TableCell>{pay.id}</TableCell>
                    <TableCell>{pay.userId}</TableCell>
                    <TableCell>{pay.phone}</TableCell>
                    <TableCell>{pay.amount}</TableCell>
                    {/* Product with background color */}
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            pay.product == 'VIP'
                              ? '#e3f2fd'
                              : pay.product == 'premimum'
                              ? '#f3e5f5'
                              : pay.product == 'Basic'
                              ? '#e8f5e9'
                              : '#e0e0e0',
                          color:
                            pay.product == 'VIP'
                              ? '#0d47a1'
                              : pay.product == 'premimum'
                              ? '#6a1b9a'
                              : pay.product == 'Basic'
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
                    {/*
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() =>
                          handleOpenModal(
                            pay.product === 'VIP' ? 1 : pay.product === 'premimum' ? 2 : 3,
                            parseInt(pay.id.replace('P', ''))
                          )
                        }
                      >
                        Deactivate
                      </Button>

                    </TableCell>
                    
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ marginLeft: '8px' }}
                        onClick={() =>
                          handleOpenStkModal(parseInt(pay.userId.replace('U', '')), pay.product)
                        }
                      >
                        STK Push
                      </Button>

                    </TableCell>
                    */}
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

    {/*
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          width: '250px',
          padding: '16px',
          borderRadius: '12px'
        }
      }}
    >
      <DialogTitle>Deactivate Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Post ID"
            type="number"
            value={selectedPostId || ''}
            onChange={(e) => setSelectedPostId(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Product ID"
            type="number"
            value={selectedProductId || ''}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleDeactivate} color="error" variant="contained">
          Deactivate
        </Button>
      </DialogActions>
    </Dialog>
        */}



{/*
    <Dialog
  open={stkModalOpen}
  onClose={() => setStkModalOpen(false)}
  PaperProps={{
    sx: {
      width: '300px',
      padding: '16px',
      borderRadius: '12px',
    },
  }}
>
  <DialogTitle>STK Push</DialogTitle>
  <DialogContent>
    <DialogContentText>Enter phone number to send STK push:</DialogContentText>
   <TextField
      label="Phone Number"
      fullWidth
      value={stkPhone.startsWith('254') ? stkPhone.slice(3) : ''}
      onChange={(e) => {
        const input = e.target.value.replace(/\D/g, ''); // only digits
        const trimmed = input.replace(/^0+/, '');
        setStkPhone(`254${trimmed}`);
      }}
      margin="normal"
      helperText="Enter number without 0 (e.g. 712345678)"
    />

  </DialogContent>
  <DialogActions>
    <Button onClick={() => setStkModalOpen(false)}>Cancel</Button>
    <Button onClick={handleSendStkPush} variant="contained" color="primary">
      Send STK
    </Button>
  </DialogActions>
</Dialog>
*/}



    </MainCard>
  );
}
