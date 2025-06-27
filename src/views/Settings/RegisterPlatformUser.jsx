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

export default function RegisterPlatformUser() {
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

      {/* Snackbar */}
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
}
