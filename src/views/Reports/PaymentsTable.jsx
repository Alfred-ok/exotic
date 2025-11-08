import React, { useState, useEffect } from 'react';
import {
  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Pagination, Tabs, Tab,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Menu
} from '@mui/material';
import { FormControl, InputLabel, Select } from "@mui/material";

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




export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    userId: '',
    phone: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    ref: '',
    name: ''
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
  const [products, setProducts] = useState([]);
  const [stkDuration, setStkDuration] = useState("");
  const [stkLoading, setStkLoading] = useState(false);


  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [activatePaymentId, setActivatePaymentId] = useState(null);
  const [transactionRef, setTransactionRef] = useState('');

  const [selectedPayment, setSelectedPayment] = useState(null);



  const platformId = localStorage.getItem('platformId');
  const baseURL = import.meta.env.VITE_APP_BASE_URL;


  const [anchorEl, setAnchorEl] = useState(null);


  const handleClick = (event, pay) => {
    setAnchorEl(event.currentTarget);
    setSelectedPayment(pay);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


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
    fetch(`${baseURL}/api/payments?platform_id=${platformId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "error") {
          setReason(data.reason);
          setLoading(false);
          return;
        }

        const today = new Date();

        const transformed = data.payments.map(p => {
          const endDate = new Date(p.end_date);
          const diffTime = endDate - today; // ms
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days

          return {
            id: `P${p.payment_id}`,
            userId: `U${p.user_id}`,
            escort_name: p.escort_name,
            phone: p.phone,
            amount: parseFloat(p.amount),
            product: p.product,
            product_id: p.product_id, //new
            status: p.status,
            ref: p.transaction_reference || 'N/A',
            date: p.created_at.split(' ')[0],
            expirationDays: diffDays < 0 ? 0 : diffDays // if expired, show 0
          };
        });

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
    (!filters.name || (payment.escort_name || '').toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.userId || payment.userId.toLowerCase().includes(filters.userId.toLowerCase())) &&
    (!filters.phone || ((payment.phone || "").toString().toLowerCase().includes(filters.phone.toLowerCase()))) &&
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

  const handleDeactivate = async () => {
    try {
      const res = await fetch(`${baseURL}/api/deactivate-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_id: selectedPostId,
          platform_id: platformId,
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


  console.log('pId', selectedPostId, 'productId', selectedProductId);

  //STK MODAL OPEN
  const handleOpenStkModal = (userId, product) => {
    const productId = product === 'VIP' ? 1 : product === 'premimum' ? 2 : 3;
    setStkUserId(userId);
    setStkProductId(productId);
    setStkModalOpen(true);
  };

  const stkpayload = {
    product_id: stkProductId,
    platform_id: platformId,
    user_id: stkUserId,
    phone: stkPhone,
    duration: stkDuration,
  }

  console.log(stkpayload);

  const handleSendStkPush = async () => {
    setStkLoading(true); // start loading
    try {
      const res = await fetch(`${baseURL}/api/manual-stk-push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkpayload),
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
      setStkLoading(false); // stop loading
      setStkModalOpen(false);
      setStkPhone('');
      setStkProductId("");
    }
  };




  const handleActivateSubmit = async () => {
    if (!transactionRef.trim()) {
      alert("Please enter a transaction reference.");
      return;
    }

    const payload = {
      payment_id: activatePaymentId,
      status: "completed",
      transaction_reference: transactionRef
    }

    console.log(payload);

    try {
      const res = await fetch(`${baseURL}/api/manual-update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      console.log(result);
      if (res.ok) {
        alert("✅ Payment activated successfully!" + (result.message || "Unknown error"));
        // Optionally refresh your table data here
      } else {
        alert("❌ Activation failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      alert("⚠️ Network Error: " + error.message);
    } finally {
      setActivateModalOpen(false);
      setTransactionRef('');
    }
  };






  // fetch products when stkModalOpen
  useEffect(() => {
    if (stkModalOpen) {
      fetch(`${baseURL}/api/products`)
        .then((res) => res.json())
        .then((data) => {
          if (data.products) {
            setProducts(data.products);
          }
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [stkModalOpen]);





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
      {reason && <p style={{ textAlign: "center", margin: "10px auto" }}>{reason}</p>}
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
              <div style={{ backgroundColor: "rgba(236, 236, 236, 0.5)", maxWidth: "100%", padding: "10px", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", marginBottom: "20px" }}>
                  {/* ===== Payment Summary Cards ===== */}
                  <Grid container spacing={2} mt={2} mb={2} style={{ backgroundColor: "rgba(220, 220, 220, 0.5)", borderRadius: "15px", maxWidth: "95%", }}>

                    {/* Total Payments */}
                    <Grid item xs={12} sm={6} md={3} style={{ padding: "10px" }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 2,
                          cursor: "pointer",
                        }}
                      >
                        <CardContent sx={{ display: "flex", alignItems: "center" }} style={{ padding: "10px" }}>
                          <Box
                            sx={{
                              bgcolor: '#1976d2',
                              borderRadius: "8%",
                              p: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 2,
                            }}
                          >
                            <AutoAwesomeMotionIcon style={{ color: "white" }} />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Total Records
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {filteredPayments.length}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Success Payments */}
                    <Grid item xs={12} sm={6} md={3} style={{ padding: "10px" }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 2,
                          cursor: "pointer",
                        }}
                      >
                        <CardContent sx={{ display: "flex", alignItems: "center" }} style={{ padding: "10px" }}>
                          <Box
                            sx={{
                              bgcolor: '#e8f5e9',
                              borderRadius: "8%",
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
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Pending Payments */}
                    <Grid item xs={12} sm={6} md={3} style={{ padding: "10px" }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 2,
                          cursor: "pointer",
                        }}
                      >
                        <CardContent sx={{ display: "flex", alignItems: "center" }} style={{ padding: "10px" }}>
                          <Box
                            sx={{
                              bgcolor: '#fff8e1',
                              borderRadius: "8%",
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
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Failed Payments */}
                    <Grid item xs={12} sm={6} md={3} style={{ padding: "10px" }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: 2,
                          cursor: "pointer",
                        }}
                      >
                        <CardContent sx={{ display: "flex", alignItems: "center" }} style={{ padding: "10px" }}>
                          <Box
                            sx={{
                              bgcolor: '#ffebee',
                              borderRadius: "8%",
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
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                </div>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={2}><TextField label="Payment ID" size="small" fullWidth value={filters.id || ''} onChange={(e) => handleFilterChange('id', e.target.value)} /></Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="Name"
                      size="small"
                      fullWidth
                      value={filters.name || ''}
                      onChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                  </Grid>
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



                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box display="flex" gap={2} mb={2}>
                    <Button
                      variant="contained"
                      onClick={handleExportExcel}
                      startIcon={<FileDownloadIcon />}
                    >
                      Export Excel
                    </Button>
                  </Box>

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
                </div>


                <TableContainer component={Paper} elevation={2}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                      <TableRow>
                        <TableCell style={{ color: '#fff' }}>Payment ID</TableCell>
                        <TableCell style={{ color: '#fff' }}>Name</TableCell>
                        <TableCell style={{ color: '#fff' }}>User ID</TableCell>
                        <TableCell style={{ color: '#fff' }}>Phone</TableCell>
                        <TableCell style={{ color: '#fff' }}>Amount</TableCell>
                        <TableCell style={{ color: '#fff' }}>Product</TableCell>
                        <TableCell style={{ color: '#fff' }}>Status</TableCell>
                        <TableCell style={{ color: '#fff' }}>Reference</TableCell>
                        <TableCell style={{ color: '#fff' }}>Date</TableCell>
                        <TableCell style={{ color: '#fff' }}>Expires In</TableCell>
                        <TableCell style={{ color: '#fff' }}>Action</TableCell>
                        <TableCell style={{ color: '#fff' }}></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedPayments.map((pay, index) => (
                        <TableRow key={pay.id} sx={{
                          backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                          }
                        }}>

                          <TableCell>{pay.id}</TableCell>
                          <TableCell>{pay.escort_name || 'N/A'}</TableCell>
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
                                  pay.status === 'completed'
                                    ? '#d4edda'
                                    : pay.status === 'pending'
                                      ? '#fff3cd'
                                      : pay.status === 'failed'
                                        ? '#f8d7da'
                                        : '#e0e0e0',
                                color:
                                  pay.status === 'completed'
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
                          <TableCell>
                            {pay.expirationDays} days
                          </TableCell>
                          <TableCell>

                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={(e) => handleClick(e, pay)}
                            >
                              Actions
                            </Button>

                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              PaperProps={{
                                elevation: 1,
                                sx: {
                                  minWidth: 150,
                                  borderRadius: 1.5,
                                  boxShadow: '0px 1px 4px rgba(0,0,0,0.15)',
                                },
                                component: Paper,
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  if (selectedPayment) {
                                    setActivatePaymentId(parseInt(selectedPayment.id.replace('P', '')));
                                    setActivateModalOpen(true);
                                  }
                                }}
                              >
                                Activate
                              </MenuItem>

                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  if (selectedPayment) {
                                    handleOpenModal(selectedPayment.product_id, parseInt(selectedPayment.id.replace('P', '')));
                                  }
                                }}
                              >
                                Deactivate
                              </MenuItem>

                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  if (selectedPayment) {
                                    handleOpenStkModal(parseInt(selectedPayment.userId.replace('U', '')), selectedPayment.product_id);
                                  }
                                }}
                              >
                                STK Push
                              </MenuItem>
                            </Menu>

                          </TableCell>

                          {/* <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() =>
                                handleOpenModal(
                                  pay.product_id,
                                  parseInt(pay.id.replace('P', ''))
                                )
                              }
                            >
                              Deactivate
                            </Button>

                          </TableCell> */}
                          {/* <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              style={{ marginLeft: '8px' }}
                              onClick={() =>
                                handleOpenStkModal(parseInt(pay.userId.replace('U', '')), pay.product_id)
                              }
                            >
                              STK Push
                            </Button>

                          </TableCell> */}

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
              </div>
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




      <Dialog
        open={stkModalOpen}
        onClose={() => setStkModalOpen(false)}
        PaperProps={{
          sx: { width: "300px", padding: "16px", borderRadius: "12px" },
        }}
      >
        <DialogTitle>STK Push</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a product and enter phone number to send STK push:
          </DialogContentText>

          {/* Product selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="product-label">Product</InputLabel>
            <Select
              labelId="product-label"
              value={stkProductId || ""}
              onChange={(e) => setStkProductId(e.target.value)}
              required
            >
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Duration selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="duration-label">Duration</InputLabel>
            <Select
              labelId="duration-label"
              value={stkDuration}
              onChange={(e) => setStkDuration(e.target.value)}
              required
            >
              <MenuItem value="weekly">weekly</MenuItem>
              <MenuItem value="biweekly">Biweekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>


          {/* Phone input */}
          <TextField
            label="Phone Number"
            fullWidth
            value={stkPhone.startsWith("254") ? stkPhone.slice(3) : ""}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, ""); // only digits
              const trimmed = input.replace(/^0+/, "");
              setStkPhone(`254${trimmed}`);
            }}
            margin="normal"
            helperText="Enter number without 0 (e.g. 712345678)"
            required
          />
        </DialogContent>

        <DialogActions>
          {stkLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" py={2}>
              <l-zoomies size="60" speed="1.5" color="rgb(25, 118, 210)"></l-zoomies>
              <Typography ml={1}>Sending STK Push...</Typography>
            </Box>
          ) : (
            <>
              <Button onClick={() => setStkModalOpen(false)}>Cancel</Button>
              <Button
                onClick={handleSendStkPush}
                variant="contained"
                color="primary"
                disabled={!stkProductId || !stkPhone}
              >
                Send STK
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>



      <Dialog
        open={activateModalOpen}
        onClose={() => setActivateModalOpen(false)}
        PaperProps={{
          sx: {
            width: '300px',
            padding: '16px',
            borderRadius: '12px'
          }
        }}
      >
        <DialogTitle>Activate Payment</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Transaction Reference"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivateModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleActivateSubmit}
          >
            Activate
          </Button>
        </DialogActions>
      </Dialog>



    </MainCard>
  );
}
