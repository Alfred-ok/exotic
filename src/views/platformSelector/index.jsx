

// import { useEffect, useState } from 'react';
// import Grid from '@mui/material/Grid';
// import {
//   Typography,
//   CircularProgress,
//   Tabs,
//   Tab,
//   Box
// } from '@mui/material';
// import { useNavigate } from 'react-router';
// import { useTheme } from '@mui/material/styles';
// import PublicIcon from '@mui/icons-material/Public';
// import Swal from 'sweetalert2';

// import { gridSpacing } from 'store/constant';
// import Country from './Country';
// import MainCard from 'ui-component/cards/MainCard';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Fab
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import axios from 'axios';



// export default function PlatformSelector() {
//   const [isLoading, setLoading] = useState(false);
//   const [globalLoading, setGlobalLoading] = useState(true);
//   const [platforms, setPlatforms] = useState([]);
//   const [countryCounts, setCountryCounts] = useState({});
//   const [selectedTab, setSelectedTab] = useState('');

//   const [form, setForm] = useState({ name: '', domain: '', country: 'Kenya' });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const role = localStorage.getItem('userRole');


//   const navigate = useNavigate();
//   const theme = useTheme();

//   const countries = [
//     { name: 'Kenya', code: 'ke' },
//     { name: 'Nigeria', code: 'ng' },
//     { name: 'Tanzania', code: 'tz' },
//     { name: 'South Africa', code: 'za' }
//   ];  


//   useEffect(() => {
//     const fetchPlatforms = async () => {
//       try {
//         const response = await fetch('https://api.exoticnairobi.com/api/platforms');
//         if (!response.ok) throw new Error('Failed to fetch platforms');

//         const result = await response.json();
//         if (result.status === 200 && Array.isArray(result.platforms)) {
//           const formatted = result.platforms.map((p) => ({
//             id: p.id,
//             name: p.name,
//             domain: p.domain,
//             country: p.country
//           }));

//           const counts = {};
//           countries.forEach(c => {
//             counts[c.name] = formatted.filter(p => p.country === c.name).length;
//           });

//           setPlatforms(formatted);
//           setCountryCounts(counts);

//           const firstWithPlatforms = countries.find(c => counts[c.name] > 0);
//           if (firstWithPlatforms) {
//             setSelectedTab(firstWithPlatforms.name);
//           }
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Invalid data received from server.'
//           });
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Connection Error',
//           text: 'Failed to fetch platforms. Please try again later.'
//         });
//       } finally {
//         setGlobalLoading(false);
//       }
//     };

//     fetchPlatforms();
//   }, []);


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const res = await axios.post('https://api.exoticnairobi.com/api/platforms', form, {
//       headers: { 'Content-Type': 'application/json' }
//     });
//     setOpenDialog(false);

//     Swal.fire({
//       icon: 'success',
//       title: 'Platform Created',
//       text: `${form.name} was added successfully!`,
//       timer: 2000,
//       showConfirmButton: false
//     });

//     // Reset form
//     setForm({ name: '', domain: '', country: 'Kenya' });
//     setOpenDialog(false);

//     // Refetch platforms
//     const response = await fetch('https://api.exoticnairobi.com/api/platforms');
//     const result = await response.json();

//     if (result.status === 200 && Array.isArray(result.platforms)) {
//       const formatted = result.platforms.map((p) => ({
//         id: p.id,
//         name: p.name,
//         domain: p.domain,
//         country: p.country
//       }));
//       const counts = {};
//       countries.forEach(c => {
//         counts[c.name] = formatted.filter(p => p.country === c.name).length;
//       });
//       setPlatforms(formatted);
//       setCountryCounts(counts);
//     }

//   } catch (err) {
//     console.error('Error creating platform:', err);
//     setOpenDialog(false);
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: err.response?.data?.message || 'Failed to create platform.'
//     });
//   } finally {
//     setLoading(false);
//   }
// };



//   const handleCountryClick = async (id) => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://api.exoticnairobi.com/api/dashboard-summary', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ platform_id: id }),
//       });

//       if (!response.ok) throw new Error(`Server responded with ${response.status}`);
//       const result = await response.json();

//       if (result?.platform) {
//         localStorage.setItem('platform', result.platform);
//         localStorage.setItem('platformId', id);
//         navigate("/dashboard/default");
//         window.location.reload(); // Force reload after navigation
//       } else {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Unsupported Platform',
//           text: 'Platform not supported or data unavailable.'
//         });
//       }
//     } catch (err) {
//       console.error("API error:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Connection Failed',
//         text: 'Failed to connect to the server. Please try again.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   return (
//     <MainCard
//       sx={{
//         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//         transition: 'box-shadow 0.3s ease-in-out',
//         '&:hover': {
//           boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
//         }
//       }}
//       title={
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent:"space-between",
//           gap: '8px',
//           backgroundColor: theme.palette.secondary[800],
//           color: 'white',
//           padding: '20px 16px',
//           borderRadius: '8px'
//         }}>
//           <div style={{display:"flex", alignItems:'center',gap: '8px',}}>
//             <PublicIcon />
//             <span>Platform Selector</span>
//           </div>
//           <div>
//            {role == 'admin'?

//             <Button
//               variant="contained"
//               onClick={() => setOpenDialog(true)}
//               startIcon={<AddIcon />}
//               sx={{
//                 backgroundColor: '#ffffff',
//                 color: theme.palette.secondary[800],
//                 '&:hover': {
//                   backgroundColor: '#f0f0f0'
//                 },
//                 fontWeight: 600
//               }}
//             >
//               Add Platform
//             </Button>
//             :
//             <></>
//            }
//           </div>
//         </div>
//       }
//     >
//       <Typography variant="body2" style={{ padding: "15px" }}>
//         Select a Country to Explore Available Sites
//       </Typography>

//       {globalLoading ? (
//         <div style={{ textAlign: 'center', padding: '50px' }}>
//           <CircularProgress />
//           <Typography variant="body2" sx={{ mt: 2 }}>Loading platforms...</Typography>
//         </div>
//       ) : (
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={selectedTab}
//             onChange={handleTabChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             sx={{ mb: 4 }}
//           >
//             {countries.map((country) => (
//               <Tab
//                 key={country.name}
//                 value={country.name}
//                 label={
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <img
//                       src={`https://flagcdn.com/w40/${country.code}.png`}
//                       alt={country.name}
//                       style={{ width: 24, height: 16, borderRadius: 2 }}
//                     />
//                     {`${country.name} (${countryCounts[country.name] || 0})`}
//                   </Box>
//                 }
//               />
//             ))}
//           </Tabs>


//           <Grid container spacing={gridSpacing}>
//             {platforms
//               .filter((p) => p.country === selectedTab)
//               .map((platform) => (
//                 <Grid item key={platform.id} lg={3} md={6} sm={6} xs={12}>
//                   <div
//                     onClick={() => !isLoading && handleCountryClick(platform.id)}
//                     style={{
//                       cursor: isLoading ? 'not-allowed' : 'pointer',
//                       opacity: isLoading ? 0.6 : 1
//                     }}
//                   >
//                     <Country isLoading={false} dat={platform} />
//                   </div>
//                 </Grid>
//               ))}
//           </Grid>
//         </Box>
//       )}




//       {/*Add Platform*/}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Add New Platform</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit} id="platformForm">
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Platform Name"
//               fullWidth
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//             <TextField
//               margin="dense"
//               label="Domain"
//               fullWidth
//               value={form.domain}
//               onChange={(e) => setForm({ ...form, domain: e.target.value })}
//               required
//             />
//             <TextField
//               margin="dense"
//               label="Country"
//               fullWidth
//               value={form.country}
//               onChange={(e) => setForm({ ...form, country: e.target.value })}
//               required
//             />
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button type="submit" form="platformForm" variant="contained" disabled={isLoading}>
//             {isLoading ? 'Saving...' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//     </MainCard>
//   );
// }



import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import Swal from 'sweetalert2';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { gridSpacing } from 'store/constant';
import Country from './Country';
import MainCard from 'ui-component/cards/MainCard';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function PlatformSelector() {
  const [isLoading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [countryCounts, setCountryCounts] = useState({});
  const [selectedTab, setSelectedTab] = useState('');

  const [form, setForm] = useState({ name: '', domain: '', country: 'Kenya' });
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const countries = [
    { name: 'Kenya', code: 'ke' },
    { name: 'Nigeria', code: 'ng' },
    { name: 'Tanzania', code: 'tz' },
    { name: 'South Africa', code: 'za' }
  ];

  const fetchPlatforms = async () => {
    try {
      const response = await fetch(`${baseURL}/api/platforms`);
      if (!response.ok) throw new Error('Failed to fetch platforms');

      const result = await response.json();
      if (result.status === 200 && Array.isArray(result.platforms)) {
        const formatted = result.platforms.map((p) => ({
          id: p.id,
          name: p.name,
          domain: p.domain,
          country: p.country
        }));

        const counts = {};
        countries.forEach(c => {
          counts[c.name] = formatted.filter(p => p.country === c.name).length;
        });

        setPlatforms(formatted);
        setCountryCounts(counts);

        const firstWithPlatforms = countries.find(c => counts[c.name] > 0);
        if (firstWithPlatforms) {
          setSelectedTab(firstWithPlatforms.name);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid data received from server.'
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Failed to fetch platforms. Please try again later.'
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  // ---- Add or Update ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && editId) {
        // Update platform
        await axios.put(`${baseURL}/api/platforms/${editId}`, form, {
          headers: { 'Content-Type': 'application/json' }
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${form.name} was updated successfully.`,
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // Add new platform
        await axios.post(`${baseURL}/api/platforms`, form, {
          headers: { 'Content-Type': 'application/json' }
        });

        Swal.fire({
          icon: 'success',
          title: 'Platform Created',
          text: `${form.name} was added successfully!`,
          timer: 2000,
          showConfirmButton: false
        });
      }

      setForm({ name: '', domain: '', country: 'Kenya' });
      setOpenDialog(false);
      setIsEdit(false);
      setEditId(null);
      fetchPlatforms();
    } catch (err) {
      console.error('Error saving platform:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to save platform.'
      });
    } finally {
      setLoading(false);
    }
  };

  // ---- Edit ----
  const handleEdit = (platform) => {
    setForm({ name: platform.name, domain: platform.domain, country: platform.country });
    setIsEdit(true);
    setEditId(platform.id);
    setOpenDialog(true);
  };

  // ---- Delete ----
  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Delete ${name}?`,
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/platforms/${id}`);
        Swal.fire('Deleted!', `${name} has been deleted.`, 'success');
        fetchPlatforms();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire('Error', 'Failed to delete platform.', 'error');
      }
    }
  };

  const handleCountryClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/dashboard-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform_id: id }),
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.json();

      if (result?.platform) {
        localStorage.setItem('platform', result.platform);
        localStorage.setItem('platformId', id);
        navigate("/dashboard/default");
        window.location.reload();
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Unsupported Platform',
          text: 'Platform not supported or data unavailable.'
        });
      }
    } catch (err) {
      console.error("API error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Connection Failed',
        text: 'Failed to connect to the server. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard
      title={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:"space-between",
          gap: '8px',
          backgroundColor: theme.palette.secondary[800],
          color: 'white',
          padding: '20px 16px',
          borderRadius: '8px'
        }}>
          <div style={{display:"flex", alignItems:'center',gap: '8px',}}>
            <PublicIcon />
            <span>Platform Selector</span>
          </div>
          {role === 'admin' && (
            <Button
              variant="contained"
              onClick={() => {
                setForm({ name: '', domain: '', country: 'Kenya' });
                setIsEdit(false);
                setOpenDialog(true);
              }}
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: '#ffffff',
                color: theme.palette.secondary[800],
                '&:hover': { backgroundColor: '#f0f0f0' },
                fontWeight: 600
              }}
            >
              Add Platform
            </Button>
          )}
        </div>
      }
    >
      {globalLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading platforms...</Typography>
        </div>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 4 }}>
            {countries.map((country) => (
              <Tab
                key={country.name}
                value={country.name}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src={`https://flagcdn.com/w40/${country.code}.png`}
                      alt={country.name}
                      style={{ width: 24, height: 16, borderRadius: 2 }}
                    />
                    {`${country.name} (${countryCounts[country.name] || 0})`}
                  </Box>
                }
              />
            ))}
          </Tabs>

          <Grid container spacing={gridSpacing}>
            {platforms
              .filter((p) => p.country === selectedTab)
              .map((platform) => (
                <Grid item key={platform.id} lg={3} md={6} sm={6} xs={12}>
                  <div
                    style={{
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.6 : 1,
                      position: 'relative',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '10px',
                      backgroundColor:"#4527a0"
                    }}
                  >
                    {role === 'admin' && (
                      <Box display="flex" justifyContent="flex-end" mt={1}>
                        <IconButton
                          size="small"
                          onClick={(e) => setAnchorEl({ id: platform.id, anchor: e.currentTarget })}
                        >
                          <MoreVertIcon fontSize="small" style={{color:"#fff"}}/>
                        </IconButton>
                      </Box>
                    )}

                    <div onClick={() => !isLoading && handleCountryClick(platform.id)}>
                      <Country isLoading={false} dat={platform} />
                    </div>
                    

                  </div>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEdit ? "Edit Platform" : "Add New Platform"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="platformForm">
            <TextField
              autoFocus
              margin="dense"
              label="Platform Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Domain"
              fullWidth
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Country"
              fullWidth
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" form="platformForm" variant="contained" disabled={isLoading}>
            {isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl?.anchor}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const platform = platforms.find(p => p.id === anchorEl.id);
            if (platform) handleEdit(platform);
            handleMenuClose();
          }}
        >
          <EditIcon fontSize="small" style={{ marginRight: 8 }} /> Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(anchorEl.id, platforms.find(p => p.id === anchorEl.id)?.name);
            handleMenuClose();
          }}
        >
          <DeleteIcon fontSize="small" color="error" style={{ marginRight: 8 }} /> Delete
        </MenuItem>
      </Menu>

    </MainCard>
  );
}
