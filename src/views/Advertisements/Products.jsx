
/*
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
  MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import Swal from 'sweetalert2';
import { zoomies } from 'ldrs'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: '', monthly_price: '', biweekly_price: '', currency: 'KES' });
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  zoomies.register();
  const [refreshTrigger, setRefreshTrigger] = useState(false);



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
    setLoadingProducts(true);
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
  }, [refreshTrigger]);


  const handleFormOpen = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setForm({
        name: product.name,
        biweekly_price: product.biweekly_price,
        monthly_price: product.monthly_price,
        currency: product.currency
      });

    } else {
      setSelectedProduct(null);
      setForm({ name: '', biweekly_price: '', monthly_price: '', currency: 'KES' });
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
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product updated successfully!',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });

      window.location.reload();
    } else {
      // Create
      const response = await axios.post('https://api.exoticnairobi.com/api/products', form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product created successfully!',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });

      window.location.reload();
    }

    console.log(data)

      setOpenDialog(false);
      //fetchProducts();
      setRefreshTrigger(prev => !prev); // 👈 Trigger table reload
    } catch (error) {
      console.error('Error saving product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to save product.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
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
      //fetchProducts();
      setRefreshTrigger(prev => !prev); // 👈 Trigger table reload
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to delete product',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "20px", margin: "0px auto", backgroundColor: 'rgb(240, 242, 246)' }}>
              <l-zoomies
                size="300"
                speed="1.5"
                color="rgb(59, 130, 246)"
              ></l-zoomies>
            </div>
          ) : products.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell sx={{ color: '#ffffff !important', fontWeight: 'bold' }}>#</TableCell>
                  <TableCell sx={{ color: '#ffffff !important', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#ffffff !important', fontWeight: 'bold' }}>Biweekly Price</TableCell>
                  <TableCell sx={{ color: '#ffffff !important', fontWeight: 'bold' }}>Monthly Price</TableCell>
                  <TableCell sx={{ color: '#ffffff !important', fontWeight: 'bold' }}>Currency</TableCell>
                  <TableCell sx={{ color: '#ffffff !important', fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.biweekly_price}</TableCell>
                    <TableCell>{product.monthly_price}</TableCell>
                    <TableCell>{product.currency}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => handleFormOpen(product)}
                        sx={{ mr: 1 }}
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
          <Typography variant="body2" sx={{ mt: 2 }}>No products available.</Typography>
        )}
      </Paper>

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
                  label="Biweekly Price"
                  type="number"
                  fullWidth
                  value={form.biweekly_price}
                  onChange={(e) => setForm({ ...form, biweekly_price: e.target.value })}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Monthly Price"
                  type="number"
                  fullWidth
                  value={form.monthly_price}
                  onChange={(e) => setForm({ ...form, monthly_price: e.target.value })}
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
*/




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

const initialForm = { name: '', monthly_price: '', biweekly_price: '', currency: 'KES' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const showAlert = (text, type = 'success') => {
    Swal.fire({
      icon: type,
      title: type === 'success' ? 'Success' : 'Error',
      text,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data } = await axios.get('https://api.exoticnairobi.com/api/products', { withCredentials: true });
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
      currency: product.currency
    } : initialForm);
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = selectedProduct
        ? `https://api.exoticnairobi.com/api/products/${selectedProduct.id}`
        : 'https://api.exoticnairobi.com/api/products';
      const method = selectedProduct ? 'put' : 'post';
      await axios[method](url, form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      showAlert(`Product ${selectedProduct ? 'updated' : 'created'} successfully!`);
      setOpenDialog(false);
      setRefreshTrigger(prev => !prev);
    } catch {
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
      setDeleteDialogOpen(false);
      setRefreshTrigger(prev => !prev);
    } catch {
      showAlert('Failed to delete product', 'error');
    } finally {
      setLoading(false);
    }
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
                  {['#', 'Name', 'Biweekly Price', 'Monthly Price', 'Currency', 'Actions'].map((text, i) => (
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
                  <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.biweekly_price}</TableCell>
                    <TableCell>{product.monthly_price}</TableCell>
                    <TableCell>{product.currency}</TableCell>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
        <DialogContent>
          <form id="product-form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { label: 'Product Name', value: form.name, name: 'name', type: 'text' },
                { label: 'Biweekly Price', value: form.biweekly_price, name: 'biweekly_price', type: 'number' },
                { label: 'Monthly Price', value: form.monthly_price, name: 'monthly_price', type: 'number' }
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




