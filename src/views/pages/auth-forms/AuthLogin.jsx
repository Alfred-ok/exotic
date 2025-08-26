

// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';
// import Swal from 'sweetalert2';




// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Typography,
//   Box
// } from '@mui/material';


// import AnimateButton from 'ui-component/extended/AnimateButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import CircularProgress from '@mui/material/CircularProgress';



// export default function AuthLogin() {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const [checked, setChecked] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();


//   const handleLogin = async () => {
//   setLoading(true);
//   try {
//     // Optional: Remove CSRF step since Laravel is not using credentials
//     // But you may keep it if your backend expects it for consistency
//     await axios.get('https://api.exoticnairobi.com/sanctum/csrf-cookie');

//     // Step 2: Perform login
//     const response = await axios.post(
//       'https://api.exoticnairobi.com/api/login',
//       {
//         email,
//         password
//       }
//     );

//     const { message, user } = response.data;

    
//     // Save to localStorage
//     localStorage.setItem('userName', user.name);
//     localStorage.setItem('userEmail', user.email);
//     localStorage.setItem('userRole', user.role);

//     //alert(message);
//     navigate('/platform-selector');
//   } catch (error) {
//     alert('Login failed: ' + (error.response?.data?.message || 'Something went wrong.'));
//   } finally {
//     setLoading(false);
//   }
// };


//    const handleGoogleLogin = () => {
//    //window.location.href = 'https://api.exoticnairobi.com/api/auth/google';
//    window.open('https://api.exoticnairobi.com/api/auth/google', '_blank');
//   };


//   return (
//     <>
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

//       <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
//         {/*<Grid>
//           <FormControlLabel
//             control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
//             label="Keep me logged in"
//           />
//         </Grid>*/}
//         <Grid>
//           <Typography variant="subtitle1" component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
//             Forgot Password?
//           </Typography>
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 2 }}>
//         <AnimateButton>
//           <Button 
//             color="info" 
//             fullWidth 
//             size="large" 
//             variant="contained" 
//             onClick={handleLogin} 
//             disabled={loading}
//             startIcon={loading && <CircularProgress size={20} color="inherit" />}
//           >
//             {loading ? 'Signing In...' : 'Sign In'}
//           </Button>
//         </AnimateButton>
//       </Box>
//       <Box sx={{ mt: 2 }}>   
//        <button
//           onClick={handleGoogleLogin}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '10px',
//             padding: '10px 20px',
//             backgroundColor: 'rgba(186, 186, 186, 0.2)',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             width: '100%',
//             color: '#333',
//             fontWeight: 500
//           }}
//         >
//           <img
//             src="https://developers.google.com/identity/images/g-logo.png"
//             alt="Google logo"
//             style={{ width: '20px', height: '20px' }}
//           />
//           Sign in with Google
//         </button>

//       </Box>
      

//     </>
//   );
// }




import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  FormControl,
  Grid
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const API_BASE_URL = 'https://api.exoticnairobi.com/api';
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  // Check for existing authentication on component mount
  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    const existingToken = localStorage.getItem('token');
    console.log(':mag: Checking existing auth:', { existingUser, existingToken });
    if (existingUser && existingToken) {
      try {
        const parsedUser = JSON.parse(existingUser);
        setUser(parsedUser);
        setToken(existingToken);
        console.log(':white_check_mark: Found existing auth, navigating...');
        navigate('/platform-selector');
      } catch (error) {
        console.log(':x: Invalid stored user data, clearing...');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);
  // Handle Google OAuth callback (when redirected back from Google)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    if (error) {
      console.log(':x: Google OAuth error:', error);
      Swal.fire('Error', 'Google authentication was cancelled or failed.', 'error');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    if (code) {
      console.log(':key: Google OAuth code received:', code);
      handleGoogleCallback(code);
    }
  }, []);
  // Handle the Google callback
  const handleGoogleCallback = async (code) => {
    setGoogleLoading(true);
    console.log(':arrows_counterclockwise: Processing Google callback...');
    try {
      // Send the code to your backend
      const response = await axios.post(`${API_BASE_URL}/auth/google/callback`, {
        code: code
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log(':white_check_mark: Google callback response:', response.data);
      if (response.data.authenticated && response.data.user) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token || '');
        console.log(':floppy_disk: Stored auth data:', {
          user: response.data.user,
          token: response.data.token
        });
        setUser(response.data.user);
        setToken(response.data.token);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        Swal.fire('Success', 'Successfully signed in with Google!', 'success');
        navigate('/platform-selector');
      } else {
        throw new Error(response.data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error(':x: Google callback error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Google authentication failed';
      Swal.fire('Error', errorMessage, 'error');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } finally {
      setGoogleLoading(false);
    }
  };
  // ---------- Email/password login ----------
  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log(':e-mail: Attempting email/password login...');
      // Get CSRF cookie first
      await axios.get('https://api.exoticnairobi.com/sanctum/csrf-cookie');
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log(':white_check_mark: Login response:', response.data);
      const { message, user, token } = response.data;
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token || '');
      console.log(':floppy_disk: Stored in localStorage:', {
        user: JSON.stringify(user),
        token: token
      });
      setUser(user);
      setToken(token);
      Swal.fire('Success', message, 'success');
      navigate('/platform-selector');
    } catch (error) {
      console.error(':x: Login failed:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      Swal.fire('Error', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };
  // ---------- Start Google login (redirect method) ----------
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    console.log(':rocket: Starting Google OAuth...');
    try {
      // Get the Google auth URL from your backend
      const response = await axios.get(`${API_BASE_URL}/auth/google/url`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log(':link: Google auth URL response:', response.data);
      if (response.data.url) {
        console.log(':arrow_upper_right: Redirecting to Google:', response.data.url);
        // Redirect to Google OAuth
        window.location.href = response.data.url;
      } else {
        throw new Error('No auth URL received from backend');
      }
    } catch (error) {
      console.error(':x: Failed to get Google auth URL:', error);
      Swal.fire('Error', 'Could not initiate Google login. Please try again.', 'error');
      setGoogleLoading(false);
    }
  };
  // Show loading state if processing Google callback
  if (googleLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          gap: 2
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1">Processing Google authentication...</Typography>
      </Box>
    );
  }
  return (
    <>
      {/* Email field */}
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
      {/* Password field */}
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
      {/* Forgot password */}
      <Grid container sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Grid>
          <Typography
            variant="subtitle1"
            component={Link}
            to="/forgot-password"
            color="secondary"
            sx={{ textDecoration: 'none' }}
          >
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>
      {/* Login button */}
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            color="info"
            fullWidth
            size="large"
            variant="contained"
            onClick={handleLogin}
            disabled={loading || googleLoading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </AnimateButton>
      </Box>
      {/* Google Sign-in */}
      <Box sx={{ mt: 2 }}>
        <button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px 20px',
            backgroundColor: googleLoading ? '#CCCCCC' : '#4285F4',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: googleLoading ? 'not-allowed' : 'pointer',
            width: '100%',
            color: 'white',
            fontWeight: 500
          }}
        >
          {googleLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '2px' }}
            />
          )}
          {googleLoading ? 'Connecting...' : 'Sign in with Google'}
        </button>
      </Box>
      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#F5F5F5', borderRadius: 1 }}>
          <Typography variant="caption" color="textSecondary">
            Debug Info: Check browser console for detailed logs
          </Typography>
        </Box>
      )}
    </>
  );
}