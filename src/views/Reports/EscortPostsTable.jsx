

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableSortLabel, TextField, Pagination, Tabs, Tab,
  Typography
} from '@mui/material';
import * as XLSX from 'xlsx';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

import { Card, CardContent } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { zoomies } from 'ldrs'
//import { jsPDF } from 'jspdf';
//import 'jspdf-autotable';

//icons
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';

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
  { id: 'registered', label: 'Post Date' },
  { id: 'guid', label: 'URL' },
  { id: 'activation', label: 'Activation' }
];

 //const location = useLocation();
 //const { platformId } = location.state || {};

 


const EscortPostsTable = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    id: '', name: '', phone: '', status: '', registered: '', guid: '', dateFrom: '', dateTo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [viewTab, setViewTab] = useState(0);
  //const rowsPerPage = 5;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  zoomies.register();
  const [loading, setLoading] = useState(false);
  const totalPosts = posts.length;
  const navigate = useNavigate();

  const platformId = localStorage.getItem('platformId');
  const role = localStorage.getItem('userRole');
  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    setLoading(true);
    axios.post(`${baseURL}/api/escort-posts`, { platform_id: platformId  })
      .then(res => {
        const escortData = res.data.escort_posts.map(post => ({
          id: `P${post.ID}`,
          name: post.post_title,
          phone: post.phone_number,
          status: post.post_status,
          registered: post.post_date.split(' ')[0],
          guid: post.guid
        }));

        setPosts(escortData);

        console.log(escortData);
        setLoading(false);
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
    (!filters.guid || post.guid.includes(filters.guid)) &&
    (!filters.dateFrom || new Date(post.registered) >= new Date(filters.dateFrom)) &&
    (!filters.dateTo || new Date(post.registered) <= new Date(filters.dateTo))
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

  /*
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Escort Posts', 14, 15);
    doc.autoTable({
      head: [escortHeaders.map(h => h.label)],
      body: filteredPosts.map(post => [post.id, post.name, post.phone, post.status, post.registered, post.guid]),

      startY: 20
    });
    doc.save('escort-posts.pdf');
  };
*/

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



    // ✅ build chart data grouped by registered date
    const chartDataByDate = Object.values(
      posts.reduce((acc, post) => {
        const date = post.registered; // already in yyyy-mm-dd format
        if (!acc[date]) {
          acc[date] = { date, count: 0 };
        }
        acc[date].count += 1;
        return acc;
      }, {})
    ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
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
              <span>Escort Profiles Reports</span>
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
      <Box mb={2}>
      
        <Tabs value={viewTab} onChange={(e, val) => setViewTab(val)}>
          <Tab label="Table View" />
          <Tab label="Chart View" />
        </Tabs>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        {/* <div style={{ display:"flex", marginTop:"25px", marginBottom:"20px" }}>
          <Typography variant="h6" color="primary">;
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "8px" }}
              startIcon={<PersonIcon />}
            >
              Total Escort Profiles: {totalPosts}
            </Button>
          </Typography> 
          
          {chartData.map((item) => {
              let icon;

                // Assign icon based on item.status
                switch (item.status.toLowerCase()) {
                  case 'success':
                    icon = <CheckCircleIcon />;
                    break;
                  case 'pending':
                    icon = <HourglassEmptyIcon />;
                    break;
                  case 'failed':
                    icon = <ErrorIcon />;
                    break;
                  default:
                    icon = <PersonIcon />;
                }
                return (
                  <Typography
                    color="primary"
                    style={{ display: "flex" }}
                    key={item.status}
                    variant="body2"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "8px" }}
                      startIcon={icon}
                    >
                      {item.status}: {item.count}
                    </Button>
                  </Typography>
                );
          })}
        </div> */}

        <Grid container spacing={2} mt={2} mb={2} style={{backgroundColor:"rgba(220, 220, 220, 0.5)",padding:"10px", borderRadius:"15px"}}>
        {/* Total Profiles Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              cursor: "pointer",
              "&:hover": { boxShadow: 3 },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center"}}>
              <Box
                sx={{
                  borderRadius: "10%",
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <PersonIcon color="primary" />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Escort Profiles
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {totalPosts}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Dynamic Status Cards */}
        {chartData.map((item) => {
          let icon;
          let bgColor;

          switch (item.status.toLowerCase()) {
            case "published":
              icon = <CheckCircleIcon color="success" />;
              bgColor = "#e8f5e9";
              break;
            case "private":
              icon = <HourglassEmptyIcon color="warning" />;
              bgColor = "#fff8e1";
              break;
            default:
              icon = <ErrorIcon color="error" />;
              bgColor = "#ffebee";
          }

          return (
            <Grid item xs={12} sm={6} md={2} key={item.status}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      bgcolor: bgColor,
                      borderRadius: "8%",
                      p: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    {icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.count}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
        
        </div>
      </Box>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}> 
      <Box display="flex" justifyContent="flex" gap={2} mb={2} style={{marginTop:"20px"}}>
           {/* <Button variant="contained" color="secondary" startIcon={<PictureAsPdfIcon />} onClick={exportToPDF}>Export PDF</Button>*/}
            <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />}  onClick={exportToExcel}>Export Excel</Button>
        </Box>
      {/* Rows per page selector */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} mb={2} gap={2}>
        <Typography variant="body2">Rows per page:</Typography>
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
            <Grid item xs={6} sm={2}>
              <TextField
                label="URL"
                size="small"
                fullWidth
                value={filters.guid}
                onChange={e => handleFilterChange('guid', e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={2}>
              <TextField
                type="date"
                label="From Date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={filters.dateFrom}
                onChange={e => handleFilterChange('dateFrom', e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={2}>
              <TextField
                type="date"
                label="To Date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={filters.dateTo}
                onChange={e => handleFilterChange('dateTo', e.target.value)}
              />
            </Grid>

          </Grid>

          

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
                  <TableRow key={post.id} sx={{ 
                    backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff', 
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                      }
                    }}>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.phone}</TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            post.status == 'publish'
                              ? '#d4edda'
                              : post.status == 'private'
                              ? '#fff3cd'
                              : post.status == 'failed'
                              ? '#f8d7da'
                              : '#e0e0e0',
                          color:
                            post.status == 'publish'
                              ? '#155724'
                              : post.status == 'private'
                              ? '#856404'
                              : post.status == 'failed'
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
                        {post.status}
                      </Box>
                    </TableCell>

                    <TableCell>{post.registered}</TableCell>
                     <TableCell>
                     <a href={post.guid}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '0.75rem',
                            color: '#1976d2',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}>{post.guid.slice(0, 21)}</a>
                      </TableCell>

                      { role === "sub-admin"|| role === "admin" ?
                       <TableCell>
                        <Button variant="contained" color="primary" style={{color:"#fff"}} 
                        onClick={() =>
                          navigate('/FreeTrialActivation', { state: { id: post.id,  } })
                        }>
                          Free Trial
                        </Button>
                       </TableCell>
                       : null
                       }

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
            <AreaChart
              data={chartDataByDate}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                name="Profiles Registered"
                stroke="#1976d2"
                fill="#90caf9"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
      )}
      </> 
    )}
    </MainCard>
    </>
  );
};

export default EscortPostsTable;
