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
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    currency: 'KES'
  });
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Fetch products
  const fetchProducts = async () => {
  try {
    const res = await axios.get('https://api.exoticnairobi.com/api/products', {
      withCredentials: true
    });

    console.log(res.data.products);
    // If your API returns { products: [...] }
    // setProducts(res.data.products || []);

    // If your API returns an array directly
    setProducts(res.data.products || []);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    showSnackbar('Failed to fetch products', 'error');
  } finally {
    setLoadingProducts(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Step 1: Get CSRF cookie
    /*await axios.get('https://api.exoticnairobi.com/sanctum/csrf-cookie', {
      withCredentials: true
    });

    // Step 2: Submit the form
    const data = await axios.post('https://api.exoticnairobi.com/api/products', form, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    console.log(data)
    // Step 3: Reset and refresh
    setForm({ name: '', price: '', currency: 'KES' });
    setOpenDialog(false);
    showSnackbar('Product created successfully');
    fetchProducts();
  } catch (error) {
    console.error('Failed to create product:', error);
    showSnackbar('Failed to create product', 'error');
  } finally {
    setLoading(false);
  }
};


  return (
    <MainCard title="Products">
      {/* Add New Button 
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add New Product
        </Button>
      </Box>

      {/* Product Table 
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Available Products</Typography>

        {loadingProducts ? (
          <Typography>Loading...</Typography>
        ) : products.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Currency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.currency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>No products available.</Typography>
        )}
      </Paper>

      {/* Create Product Modal 
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Product</DialogTitle>
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
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Feedback 
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
}
*/

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

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', currency: 'KES' });
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://api.exoticnairobi.com/api/products', {
        withCredentials: true
      });
      setProducts(res.data.products || []);
    } catch (error) {
      showSnackbar('Failed to fetch products', 'error');
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
      console.log(response.data); // if needed
      showSnackbar('Product updated successfully');
    } else {
      // Create
      const response = await axios.post('https://api.exoticnairobi.com/api/products', form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log(response.data);
      showSnackbar('Product created successfully');
    }

    console.log(data)

      setOpenDialog(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      showSnackbar('Failed to save product', 'error');
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
      showSnackbar('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showSnackbar('Failed to delete product', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setLoading(false);
    }
  };

  return (
    <MainCard title="Products">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => handleFormOpen(null)}>
          Add New Product
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Available Products</Typography>

        {loadingProducts ? (
          <Typography>Loading...</Typography>
        ) : products.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
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

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
}




