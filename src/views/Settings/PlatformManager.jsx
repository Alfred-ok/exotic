import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

export default function PlatformManager() {
  const [platforms, setPlatforms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    name: '',
    domain: '',
    country: 'Kenya'
  });
  const [loading, setLoading] = useState(false);

  // Fetch platforms from API
  const fetchPlatforms = async () => {
    try {
      const res = await fetch('https://api.exoticnairobi.com/api/platforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Platform_id: "1" })
      });
      const data = await res.json();
      setPlatforms(Array.isArray(data) ? data : [data]); // normalize if single object
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://api.exoticnairobi.com/api/platforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ name: '', domain: '', country: 'Kenya' });
      setOpenDialog(false);
      fetchPlatforms();
    } catch (error) {
      console.error('Error creating platform:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Platforms">
      {/* Add New Platform Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add New Platform
        </Button>
      </Box>

      {/* Platform Table */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Available Platforms</Typography>
        {platforms.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {platforms.map((platform, index) => (
                  <TableRow key={platform.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{platform.name}</TableCell>
                    <TableCell>{platform.domain}</TableCell>
                    <TableCell>{platform.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>No platforms available.</Typography>
        )}
      </Paper>

      {/* Dialog for Create Platform */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Platform</DialogTitle>
        <DialogContent>
          <form id="platform-form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  label="Platform Name"
                  fullWidth
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Domain URL"
                  fullWidth
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country"
                  fullWidth
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>Cancel</Button>
          <Button type="submit" form="platform-form" variant="contained" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}
