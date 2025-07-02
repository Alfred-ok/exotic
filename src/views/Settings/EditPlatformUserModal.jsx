import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const roles = ['admin', 'sub_admin', 'sales'];

export default function EditPlatformUserModal({ open, onClose, userData, onUpdated }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'sub_admin'
  });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name,
        email: userData.email,
        password: '',
        role: userData.role
      });
    }
  }, [userData]);

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
      await axios.put(`https://api.exoticnairobi.com/api/users/${userData.id}`, form);
      Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
        toast: true,
        timer: 2000,
        position: 'top-end',
        showConfirmButton: false
      });
      onUpdated?.(); // notify parent to refresh
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
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Leave blank to keep current password"
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
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save Changes</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
