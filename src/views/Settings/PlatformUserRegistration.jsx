/*
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';


const roles = ['admin', 'sub_admin', 'sales'];

export default function PlatformUserRegistration() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'sub_admin'
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showAlert = (message, type = 'success') => {
    Swal.fire({
      icon: type,
      title: message,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  };


    const handleSubmit = async (e) => {
      e.preventDefault();

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to register this user?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, register',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) return;

      setLoading(true);

      try {
       const res = await axios.post('https://api.exoticnairobi.com/api/register', form, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(res);
        showAlert('User registered successfully', 'success');
        setForm({ name: '', email: '', password: '', role: 'sub_admin' });
      } catch (error) {
        console.error('Registration failed:', error);
        showAlert('Failed to register user', 'error');
      } finally {
        setLoading(false);
      }
    };


  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Register New User
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Grid>
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
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}*/



















// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   TextField,
//   MenuItem,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import Swal from 'sweetalert2';
// import { useState } from 'react';
// import axios from 'axios';

// const roles = ['admin', 'sub_admin', 'sales'];

// export default function PlatformUserModal({ open, setOpen, onSuccess }) {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'sub_admin'
//   });
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   const baseURL = import.meta.env.VITE_APP_BASE_URL;

//   const showAlert = (message, type = 'success') => {
//     Swal.fire({
//       icon: type,
//       title: message,
//       timer: 2000,
//       showConfirmButton: false,
//       position: 'top-end',
//       toast: true
//     });
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setForm({ name: '', email: '', password: '', role: 'sub_admin' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to register this user?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, register',
//       cancelButtonText: 'Cancel'
//     });

//     if (!result.isConfirmed) return;

//     setLoading(true);
//     try {
//       const res = await axios.post(`${baseURL}/api/register`, form, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       showAlert('User registered successfully');
//       setForm({ name: '', email: '', password: '', role: 'sub_admin' });
//       onSuccess?.(); // optional callback to refresh parent
//       handleClose();
//     } catch (error) {
//       console.error('Registration failed:', error);
//       showAlert('Failed to register user', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>Register New Platform User</DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Full Name"
//                   fullWidth
//                   required
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Email"
//                   type="email"
//                   fullWidth
//                   required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   required
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Role"
//                   select
//                   fullWidth
//                   value={form.role}
//                   onChange={(e) => setForm({ ...form, role: e.target.value })}
//                 >
//                   {roles.map((role) => (
//                     <MenuItem key={role} value={role}>
//                       {role}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} disabled={loading}>Cancel</Button>
//             <Button type="submit" variant="contained" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }











import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useState } from 'react';
import axios from 'axios';

const roles = ['admin', 'sub_admin', 'sales'];

export default function PlatformUserModal({ open, setOpen, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'sub_admin',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const handleClose = () => {
    setOpen(false);
    setForm({ name: '', email: '', password: '', confirmPassword: '', role: 'sub_admin' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure both password fields are the same.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to register this user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, register',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await axios.post(`${baseURL}/api/register`, form, {
        headers: { 'Content-Type': 'application/json' },
      });

      Swal.fire({
        icon: 'success',
        title: 'User registered successfully',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
      });

      setForm({ name: '', email: '', password: '', confirmPassword: '', role: 'sub_admin' });
      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to register user',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Register New Platform User</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
