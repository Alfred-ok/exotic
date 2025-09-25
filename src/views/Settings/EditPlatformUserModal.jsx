// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Grid,
//   Button
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const roles = ['admin', 'sub_admin', 'sales'];

// export default function EditPlatformUserModal({ open, onClose, userData, onUpdated }) {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'sub_admin'
//   });

//   const baseURL = import.meta.env.VITE_APP_BASE_URL;

//   useEffect(() => {
//     if (userData) {
//       setForm({
//         name: userData.name,
//         email: userData.email,
//         password: '',
//         role: userData.role
//       });
//     }
//   }, [userData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const confirm = await Swal.fire({
//       title: 'Update User?',
//       text: 'Are you sure you want to save changes?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, update',
//       cancelButtonText: 'Cancel'
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await axios.put(`${baseURL}/api/users/${userData.id}`, form);
//       Swal.fire({
//         icon: 'success',
//         title: 'User updated successfully',
//         toast: true,
//         timer: 2000,
//         position: 'top-end',
//         showConfirmButton: false
//       });
//       onUpdated?.(); // notify parent to refresh
//       onClose();
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to update user',
//         toast: true,
//         timer: 2000,
//         position: 'top-end',
//         showConfirmButton: false
//       });
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <form onSubmit={handleSubmit}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Name"
//                 fullWidth
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Email"
//                 fullWidth
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 placeholder="Leave blank to keep current password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Role"
//                 select
//                 fullWidth
//                 value={form.role}
//                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//               >
//                 {roles.map((role) => (
//                   <MenuItem key={role} value={role}>
//                     {role}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="submit" variant="contained">Save Changes</Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// }






import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Button,
  IconButton,
  InputAdornment,
  Select,
  OutlinedInput,
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const roles = ['admin', 'sub_admin', 'sales'];

export default function EditPlatformUserModal({ open, onClose, userData, onUpdated }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'sub_admin',
    platform_ids: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [loadingPlatforms, setLoadingPlatforms] = useState(false);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  // Populate form with user data
  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name,
        email: userData.email,
        password: '',
        role: userData.role,
        platform_ids: userData.platforms?.map((p) => p.id) || []
      });
    }
  }, [userData]);

  // Fetch platforms
  useEffect(() => {
    const fetchPlatforms = async () => {
      setLoadingPlatforms(true);
      try {
        const res = await axios.get(`https://api.exoticnairobi.com/api/platforms`);
        setPlatforms(res.data.platforms || []);
      } catch (err) {
        console.error('Failed to fetch platforms', err);
      } finally {
        setLoadingPlatforms(false);
      }
    };
    if (open) fetchPlatforms();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: 'Update User?',
      text: 'Are you sure you want to save changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel'
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(`${baseURL}/api/users/${userData.id}`, form);
      Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
        toast: true,
        timer: 2000,
        position: 'top-end',
        showConfirmButton: false
      });
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update user',
        toast: true,
        timer: 2000,
        position: 'top-end',
        showConfirmButton: false
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Leave blank to keep current password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12}>
              <TextField
                label="Role"
                select
                fullWidth
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Platforms */}
            {form.role === 'sales' && (
              <Grid item xs={12}>
                <label>Assign Platform</label>
                <Select
                  multiple
                  fullWidth
                  value={form.platform_ids}
                  onChange={(e) => setForm({ ...form, platform_ids: e.target.value })}
                  input={<OutlinedInput label="Assign Platforms" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => {
                        const platform = platforms.find((p) => p.id === id);
                        return (
                          <Chip
                            key={id}
                            label={platform ? platform.name : id}
                            onMouseDown={(event) => event.stopPropagation()}
                            onDelete={() =>
                              setForm({
                                ...form,
                                platform_ids: form.platform_ids.filter((pid) => pid !== id)
                              })
                            }
                          />
                        );
                      })}
                    </Box>
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                      e.stopPropagation();
                    }
                  }}
                >
                  {loadingPlatforms ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} /> Loading...
                    </MenuItem>
                  ) : (
                    platforms.map((platform) => (
                      <MenuItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
