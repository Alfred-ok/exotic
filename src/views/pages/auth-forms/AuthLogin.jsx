

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Box
} from '@mui/material';


import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';



export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();


  const handleLogin = async () => {
  setLoading(true);
  try {
    // Optional: Remove CSRF step since Laravel is not using credentials
    // But you may keep it if your backend expects it for consistency
    await axios.get('https://api.exoticnairobi.com/sanctum/csrf-cookie');

    // Step 2: Perform login
    const response = await axios.post(
      'https://api.exoticnairobi.com/api/login',
      {
        email,
        password
      }
    );

    const { message, user } = response.data;

    // Save to localStorage
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', user.role);

    //alert(message);
    navigate('/platform-selector');
  } catch (error) {
    alert('Login failed: ' + (error.response?.data?.message || 'Something went wrong.'));
  } finally {
    setLoading(false);
  }
};


    const handleLoginSuccess = async (credentialResponse) => {
        try {
          const idToken = credentialResponse.credential;

          const response = await axios.post(
            'https://api.exoticnairobi.com/api/auth/google',
            { token: idToken }
          );

          console.log('Auth Response:', response.data);
          Swal.fire('Success', 'Login successful', 'success');

          // Optionally save to localStorage
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error('Google auth failed:', error);
          Swal.fire('Error', 'Google authentication failed', 'error');
        }
    }


  return (
    <>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Email Address / Username"
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
            color="info" 
            fullWidth 
            size="large" 
            variant="contained" 
            onClick={handleLogin} 
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </AnimateButton>
      </Box>
      <Box>   
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            Swal.fire('Error', 'Google sign-in failed', 'error');
          }}
        />
      </Box>
      

    </>
  );
}
