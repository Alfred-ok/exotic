

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

  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const handleLogin = async () => {
  setLoading(true);
  try {
    // Optional: Remove CSRF step since Laravel is not using credentials
    // But you may keep it if your backend expects it for consistency
    await axios.get(`${baseURL}/sanctum/csrf-cookie`);

    // Step 2: Perform login
    const response = await axios.post(
      `${baseURL}/api/login`,
      {
        email,
        password
      }
    );

    const { message, user } = response.data;

    console.log(user);
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


   const handleGoogleLogin = () => {
   //window.location.href = 'https://api.exoticnairobi.com/api/auth/google';
   window.open(`${baseURL}/api/auth/google`, '_blank');
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


















// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//   Button,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Typography,
//   Box,
//   FormControl,
//   Grid
// } from '@mui/material';
// import AnimateButton from 'ui-component/extended/AnimateButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import CircularProgress from '@mui/material/CircularProgress';
// export default function AuthLogin() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [error, setError] = useState('');
//   const API_BASE_URL = 'https://api.exoticnairobi.com/api';
//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();
//   // ---------- Handle Google authentication callback ----------
//   useEffect(() => {
//     const handleGoogleCallback = async () => {
//       const googleAuthSuccess = searchParams.get('google_auth');
//       const error = searchParams.get('error');
//       if (googleAuthSuccess === 'success') {
//         try {
//           setGoogleLoading(true);
//           console.log('Google authentication successful, checking status...');
//           // Check authentication status with backend
//           const response = await axios.get(`${API_BASE_URL}/auth/status`, {
//             withCredentials: true
//           });
//           if (response.data.authenticated) {
//             const { user, token } = response.data;
//             // Save to localStorage
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('token', token);
//             console.log('Google authentication completed successfully:', user);
//             // Clear URL parameters
//             setSearchParams({});
//             // Redirect to platform selector
//             navigate('/platform-selector');
//           } else {
//             setError('Google authentication failed. Please try again.');
//             Swal.fire('Error', 'Google authentication failed.', 'error');
//           }
//         } catch (error) {
//           console.error('Error checking auth status:', error);
//           setError('Could not complete Google login. Please try again.');
//           Swal.fire('Error', 'Could not complete Google login.', 'error');
//         } finally {
//           setGoogleLoading(false);
//         }
//       } else if (error) {
//         // Handle errors from Google auth
//         console.error('Google authentication error:', error);
//         setError(error);
//         Swal.fire('Error', error, 'error');
//         // Clear error from URL
//         setSearchParams({});
//       }
//     };
//     handleGoogleCallback();
//   }, [navigate, searchParams, setSearchParams]);
//   // ---------- Email/password login ----------
//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       console.log('Attempting email/password login...');
//       await axios.get('https://api.exoticnairobi.com/sanctum/csrf-cookie');
//       const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
//       console.log('Login response:', response.data);
//       const { message, user } = response.data;
//       // Save to localStorage
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', response.data.token || '');
//       console.log('Stored in localStorage');
//       Swal.fire('Success', message, 'success');
//       navigate('/platform-selector');
//     } catch (error) {
//       console.error('Login failed:', error.response?.data);
//       Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };
//   // ---------- Start Google login ----------
//   const handleGoogleLogin = () => {
//     console.log('Redirecting to Google login');
//     setGoogleLoading(true);
//     // Redirect to backend Google auth endpoint
//     window.location.href = `${API_BASE_URL}/auth/google`;
//   };
//   return (
//     <>
//       {/* Error display */}
//       {error && (
//         <Box sx={{
//           mb: 2,
//           p: 2,
//           backgroundColor: '#FFEBEE',
//           borderRadius: 1,
//           border: '1px solid #F44336'
//         }}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )}
//       {/* Email field */}
//       <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
//         <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
//         <OutlinedInput
//           id="outlined-adornment-email-login"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           name="email"
//           label="Email Address / Username"
//         />
//       </FormControl>
//       {/* Password field */}
//       <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
//         <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
//         <OutlinedInput
//           id="outlined-adornment-password-login"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           name="password"
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//                 size="large"
//               >
//                 {showPassword ? <Visibility /> : <VisibilityOff />}
//               </IconButton>
//             </InputAdornment>
//           }
//           label="Password"
//         />
//       </FormControl>
//       {/* Forgot password */}
//       <Grid container sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
//         <Grid>
//           <Typography
//             variant="subtitle1"
//             component={Link}
//             to="/forgot-password"
//             color="secondary"
//             sx={{ textDecoration: 'none' }}
//           >
//             Forgot Password?
//           </Typography>
//         </Grid>
//       </Grid>
//       {/* Login button */}
//       <Box sx={{ mt: 2 }}>
//         <AnimateButton>
//           <Button
//             color="info"
//             fullWidth
//             size="large"
//             variant="contained"
//             onClick={handleLogin}
//             disabled={loading || googleLoading}
//             startIcon={loading && <CircularProgress size={20} color="inherit" />}
//           >
//             {loading ? 'Signing In...' : 'Sign In'}
//           </Button>
//         </AnimateButton>
//       </Box>
//       {/* Google Sign-in */}
//       <Box sx={{ mt: 2 }}>
//         <button
//           onClick={handleGoogleLogin}
//           disabled={googleLoading}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '10px',
//             padding: '10px 20px',
//             backgroundColor: '#4285F4',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: googleLoading ? 'not-allowed' : 'pointer',
//             width: '100%',
//             color: 'white',
//             fontWeight: 500,
//             opacity: googleLoading ? 0.7 : 1
//           }}
//         >
//           {googleLoading ? (
//             <CircularProgress size={20} color="inherit" />
//           ) : (
//             <img
//               src="https://developers.google.com/identity/images/g-logo.png"
//               alt="Google logo"
//               style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '2px' }}
//             />
//           )}
//           {googleLoading ? 'Connecting...' : 'Sign in with Google'}
//         </button>
//       </Box>
//     </>
//   );
// }