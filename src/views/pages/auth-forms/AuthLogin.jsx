

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
import { data, Link, useNavigate } from 'react-router-dom';
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

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle popup message for Google auth
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      console.log(event);

      if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
        const { message, user } = event.data;

        console.log(event.data);
        console.log(user)
        console.log(message);

        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);

        //Swal.fire('Success', `Welcome ${user.name}`, 'success');
        alert('Success', `Welcome ${user.name}`)
        navigate('/platform-selector');
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


    const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setError('');
    
    // Open Google auth in a popup
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const authWindow = window.open(
      `${API_BASE_URL}/auth/google`,
      'Google Auth',
      `width=${width},height=${height},top=${top},left=${left}`
    );
    

       // Check if the popup was blocked
    if (!authWindow || authWindow.closed || typeof authWindow.closed === 'undefined') {
      setError('Popup was blocked by your browser. Please allow popups for this site.');
      setGoogleLoading(false);
      return;
    }
    
    // Check for popup closure and authentication status
    const checkAuthStatus = setInterval(async () => {
      if (authWindow.closed) {
        clearInterval(checkAuthStatus);
        
        // After popup closes, check if we're authenticated
        try {
          const response = await fetch(`${API_BASE_URL}/auth/status`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for sessions
          });

          console.log(response);
          
          if (response.ok) {
            const data = await response.json();

              // 👇 This will log exactly what you pasted
              console.log("Auth response from Google popup:", data);
              console.log("User object:", data.user);
              console.log("Token:", data.token);
            
            if (data.authenticated && data.user) {
              // Store user data
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('token', data.token);

              console.log(data);
              
              // Update state
              setUser(data.user);
              setError('');
            } else {
              setError('Authentication failed. Please try again.');
            }
          } else {
            setError('Unable to verify authentication status.');
          }
        } catch (error) {
          setError('Network error while checking authentication status.');
        }
        
        setLoading(false);
      }
    }, 500);
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
