

import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();


  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Optional: Remove CSRF step since Laravel is not using credentials
      // But you may keep it if your backend expects it for consistency

      //await axios.get(`${baseURL}/sanctum/csrf-cookie`);

      // Step 2: Perform login
      const response = await axios.post(
        `${baseURL}/api/login`,
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
      localStorage.setItem('platforms', JSON.stringify(user.platforms));

      //alert(message);
      navigate('/platform-selector');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  };




  const handleGoogleLogin = async () => {
    try {
      // Step 1: Get the redirect URL from backend (optional)
      const redirectRes = await axios.get(`${baseURL}/api/auth/google/redirect`);
      const googleLoginUrl = redirectRes.data.url;
      // Step 2: Open Google OAuth in a new window
      const popup = window.open(googleLoginUrl, "_blank", "width=500,height=600");
      // Step 3: Poll for completion (optional)
      const timer = setInterval(async () => {
        try {
          if (popup.closed) {
            clearInterval(timer);
            // After user finishes OAuth, call backend callback API
            const response = await axios.get(`${baseURL}/api/auth/google/callback`);
            if (response.data.success) {
              const { user, token } = response.data;
              localStorage.setItem("userName", user.name);
              localStorage.setItem("userEmail", user.email);
              localStorage.setItem("userRole", user.role);
              localStorage.setItem("platforms", JSON.stringify(user.platforms || []));
              localStorage.setItem("token", token);
              navigate("/platform-selector");
            } else {
              Swal.fire("Google login failed", response.data.message, "error");
            }
          }
        } catch (err) {
          console.error(err);
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Unable to start Google login", "error");
    }
  };


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
        {/*<Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label="Keep me logged in"
          />
        </Grid>*/}
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
      <Box sx={{ mt: 2 }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px 20px',
            backgroundColor: 'rgba(186, 186, 186, 0.2)',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            color: '#333',
            fontWeight: 500
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: '20px', height: '20px' }}
          />
          Sign in with Google
        </button>

      </Box>


    </>
  );
}

