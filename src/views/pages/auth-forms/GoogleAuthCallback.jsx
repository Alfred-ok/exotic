/*
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function GoogleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const error = query.get('error');

    if (error) {
      Swal.fire('Access Denied', decodeURIComponent(error), 'error');
      navigate('/');
      return;
    }

    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        localStorage.setItem('userName', decoded.name);
        localStorage.setItem('userEmail', decoded.email);
        localStorage.setItem('userRole', decoded.role);

        Swal.fire('Login Successful', `Welcome ${decoded.name}`, 'success');
        navigate('/platform-selector');
      } catch (e) {
        Swal.fire('Error', 'Invalid token data.', 'error');
        navigate('/');
      }
    } else {
      Swal.fire('Error', 'No token received.', 'error');
      navigate('/');
    }
  }, [navigate]);

  return <div>Signing in...</div>;
}
  */



import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
export default function GoogleAuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateWithBackend = async (code) => {
      try {
        const response = await axios.get('http://your-api-url/auth/google/callback', {
          params: { code }
        });
        const user = response.data.user;
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);
        Swal.fire('Login Successful', `Welcome ${user.name}`, 'success');
        navigate('/platform-selector');
      } catch (error) {
        Swal.fire('Error', error.response?.data?.error || 'Authentication failed', 'error');
        navigate('/');
      }
    };
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    const error = query.get('error');
    if (error) {
      Swal.fire('Access Denied', decodeURIComponent(error), 'error');
      navigate('/');
      return;
    }
    if (code) {
      authenticateWithBackend(code);
    } else {
      // If no code, maybe we got the user data directly (if you change backend to return token in URL)
      // Otherwise:
      Swal.fire('Error', 'No authorization code received', 'error');
      navigate('/');
    }
  }, [navigate]);
  return <div>Signing in...</div>;
  }
