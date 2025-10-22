
import { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid, Paper, TableContainer,
  Table, TableHead, TableRow, TableCell, TableBody, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import Swal from 'sweetalert2';
import { zoomies } from 'ldrs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

zoomies.register();

const initialForm = {
  name: '',
  monthly_price: '',
  biweekly_price: '',
  weekly_price: '',
  currency: 'KES'
};


export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const showAlert = (text, type = 'success') => {
    Swal.fire({
      icon: type,
      title: type === 'success' ? 'Success' : 'Error',
      text,
      confirmButtonText: 'OK',
      showConfirmButton: true, // ensures button is visible
    });
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data } = await axios.get(`${baseURL}/api/products`, { withCredentials: true });
      setProducts(data.products || []);
    } catch {
      showAlert('Failed to fetch products', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const openFormDialog = (product = null) => {
    setSelectedProduct(product);
    setForm(product ? {
      name: product.name,
      biweekly_price: product.biweekly_price,
      monthly_price: product.monthly_price,
      weekly_price: product.weekly_price,
      currency: product.currency
    } : initialForm);

    setOpenDialog(true);
  };

  // Create Product
  const createProduct = async () => {
    setLoading(true);
    try {
      await axios.post(`${baseURL}/api/products`, form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      showAlert('Product created successfully!');
      setOpenDialog(false);
      setRefreshTrigger(prev => !prev);
    } catch (err) {
      console.error(err);
      showAlert(err.response?.data?.errors.price_ratio || 'Failed to create product', 'error');
      setOpenDialog(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Product
  const updateProduct = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      await axios.put(`${baseURL}/api/products/${selectedProduct.id}`, form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      showAlert('Product updated successfully!');
      setOpenDialog(false);
      setRefreshTrigger(prev => !prev);
    } catch {
      showAlert('Failed to update product', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Decide based on mode
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct();
    } else {
      createProduct();
    }
  };


  const handleDelete = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      await axios.delete(`${baseURL}/api/products/${selectedProduct.id}`, {
        withCredentials: true
      });
      showAlert('Product deleted successfully');
      setDeleteDialogOpen(false);
      setRefreshTrigger(prev => !prev);
    } catch {
      showAlert('Failed to delete product', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setForm(initialForm);
  };


  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3">Products</Typography>
        <Button variant="contained" onClick={() => openFormDialog(null)}>Add New Product</Button>
      </Box>

      <Paper elevation={2}>
        {loadingProducts ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, backgroundColor: 'rgb(240, 242, 246)' }}>
            <l-zoomies size="300" speed="1.5" color="rgb(59, 130, 246)"></l-zoomies>
          </Box>
        ) : products.length ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  {['#', 'Name', 'Weekly Price', 'Biweekly Price', 'Monthly Price', 'Currency', 'Actions'].map((text, i) => (
                    <TableCell
                      key={i}
                      sx={{ color: '#fff', fontWeight: 'bold' }}
                      align={text === 'Actions' ? 'right' : 'left'}
                    >
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id} style={{ color: "#fff" }} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell >{index + 1}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{product.name}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{product.weekly_price}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{product.biweekly_price}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{product.monthly_price}</TableCell>
                    <TableCell style={{ color: "#fff" }}>{product.currency}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                        onClick={() => openFormDialog(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
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
          <Typography variant="body2" sx={{ mt: 2, p: 2 }}>No products available.</Typography>
        )}
      </Paper>

      {/* Product Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
        <DialogContent>
          <form id="product-form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { label: 'Product Name', value: form.name, name: 'name', type: 'text' },
                { label: 'Monthly Price', value: form.monthly_price, name: 'monthly_price', type: 'number' },
                { label: 'Biweekly Price', value: form.biweekly_price, name: 'biweekly_price', type: 'number' },
                { label: 'Weekly Price', value: form.weekly_price, name: 'weekly_price', type: 'number' }
              ].map(({ label, value, name, type }) => (
                <Grid item xs={12} key={name}>
                  <TextField
                    label={label}
                    fullWidth
                    type={type}
                    value={value}
                    required
                    onChange={(e) => setForm(prev => ({ ...prev, [name]: e.target.value }))}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  select
                  label="Currency"
                  fullWidth
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                  {['KES', 'USD', 'EUR'].map(curr => (
                    <MenuItem key={curr} value={curr}>{curr}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>Cancel</Button>
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




