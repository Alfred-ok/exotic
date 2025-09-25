
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
  CircularProgress,
  Select,
  OutlinedInput,
  Chip,
  Box,
} from '@mui/material';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import axios from 'axios';

const roles = ['admin', 'sub_admin', 'sales'];

export default function PlatformUserModal({ open, setOpen, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'sub_admin',
    platform_ids: [],
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const [loadingPlatforms, setLoadingPlatforms] = useState(false);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  // Fetch available platforms
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

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'sub_admin',
      platform_ids: [],
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please make sure both password fields are the same.',
      });
      return;
    }

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

      handleClose();
      onSuccess?.();
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
            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>

            {/* Email */}
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

            {/* Password */}
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
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Confirm Password */}
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

            {/* Platforms with Chips */}
            {form.role === 'sales' && (
            <Grid item xs={12}>
              <Label>Assign Platform</Label>
              <Select
                multiple
                fullWidth
                value={form.platform_ids}
                onChange={(e) =>
                  setForm({ ...form, platform_ids: e.target.value })
                }
                input={<OutlinedInput label="Assign Platforms" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const platform = platforms.find((p) => p.id === id);
                      return (
                        <Chip
                          key={id}
                          label={platform ? platform.name : id}
                          // ✅ Only remove chip when delete icon is clicked
                          onMouseDown={(event) => event.stopPropagation()} 
                          onDelete={() =>
                            setForm({
                              ...form,
                              platform_ids: form.platform_ids.filter(
                                (pid) => pid !== id
                              ),
                            })
                          }
                        />
                      );
                    })}
                  </Box>
                )}
                // ✅ Prevent clearing via Backspace/Delete keys
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
