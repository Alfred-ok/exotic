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
import axios from 'axios'; // or use fetch

export default function GoogleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateWithGoogle = async () => {
      try {
        // Extract the code from the URL (Google sends it back)
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');

        if (!code) {
          throw new Error('No authorization code received.');
        }

        // Send the code to your backend for verification
        const response = await axios.get(`/api/auth/google/callback?code=${code}`);
        // Or using fetch:
        // const response = await fetch(/api/auth/google/callback?code=${code});
        // const data = await response.json();

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        // Store user data in localStorage
        const { user } = response.data;
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);

        Swal.fire(`Login Successful, Welcome ${user.name}, success`);
        navigate('/platform-selector');

      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to authenticate with Google', 'error');
        navigate('/');
      }
    };

    authenticateWithGoogle();
  }, [navigate]);

  return <div>Signing in...</div>;
}