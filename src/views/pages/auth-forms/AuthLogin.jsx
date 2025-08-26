

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

  const API_BASE_URL = 'https://api.exoticnairobi.com/api';
  const PLATFORM_SELECTOR_URL = '/platform-selector';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle popup message for Google auth
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
        const { token, user } = event.data;

        // Save unified structure
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        Swal.fire('Success', `Welcome ${user.name}`, 'success');
        navigate(PLATFORM_SELECTOR_URL);
      } else if (event.data.type === 'GOOGLE_LOGIN_ERROR') {
        Swal.fire('Error', event.data.error || 'Authentication failed', 'error');
        setGoogleLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Email/password login
  const handleLogin = async () => {
    setLoading(true);
    try {
      await axios.get('https://api.exoticnairobi.com/sanctum/csrf-cookie');

      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      
      const { message, user } = response.data;

    
   // Save to localStorage
     localStorage.setItem('userName', user.name);
     localStorage.setItem('userEmail', user.email);
     localStorage.setItem('userRole', user.role);

     alert(message);
     navigate('/platform-selector');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Google login popup
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      `${API_BASE_URL}/auth/google`,
      'Google Auth',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

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
            disabled={loading}
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
          disabled={googleLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px 20px',
            backgroundColor: '#4285f4',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            color: 'white',
            fontWeight: 500
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '2px' }}
          />
          {googleLoading ? 'Connecting...' : 'Sign in with Google'}
        </button>
      </Box>
    </>
  );
}
