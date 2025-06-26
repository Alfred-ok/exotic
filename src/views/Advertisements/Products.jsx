

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', currency: 'KES' });
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const showAlert = (message, type = 'success') => {
  Swal.fire({
    icon: type,
    title: type === 'success' ? 'Success' : 'Error',
    text: message,
    timer: 2000,
    showConfirmButton: false,
    position: 'top-end',
    toast: true
  });
};

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://api.exoticnairobi.com/api/products', {
        withCredentials: true
      });
      setProducts(res.data.products || []);
    } catch (error) {
      showAlert('Failed to fetch products', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormOpen = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setForm({ name: product.name, price: product.price, currency: product.currency });
    } else {
      setSelectedProduct(null);
      setForm({ name: '', price: '', currency: 'KES' });
    }
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedProduct) {
      // Update
      const response = await axios.put(`https://api.exoticnairobi.com/api/products/${selectedProduct.id}`, form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      showAlert('Product updated successfully');
    } else {
      // Create
      const response = await axios.post('https://api.exoticnairobi.com/api/products', form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log(response.data);
      showAlert('Product created successfully');
    }

    console.log(data)

      setOpenDialog(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      showAlert('Failed to save product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      await axios.delete(`https://api.exoticnairobi.com/api/products/${selectedProduct.id}`, {
        withCredentials: true
      });
      showAlert('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert('Failed to delete product', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setLoading(false);
    }
  };

  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, }}>
        <Typography variant='h3'>Products</Typography>
        <Button variant="contained" onClick={() => handleFormOpen(null)}>
          Add New Product
        </Button>
      </Box>

      <Paper elevation={2}>
        {loadingProducts ? (
          <Typography>Loading...</Typography>
        ) : products.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{color:"#fff"}} sx={{ backgroundColor: '#1976d2' }}>
                <TableRow style={{color:"#fff"}}>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.currency}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleFormOpen(product)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setSelectedProduct(product);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>No products available.</Typography>
        )}
      </Paper>

      {/* Create/Update Product Modal */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
        <DialogContent>
          <form id="product-form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  fullWidth
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  value={form.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value) && Number(value) >= 0) {
                      setForm({ ...form, price: value });
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Currency"
                  fullWidth
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                  {['KES', 'USD', 'EUR'].map((curr) => (
                    <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>Cancel</Button>
          <Button type="submit" form="product-form" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : selectedProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

    </MainCard>
  );
}




