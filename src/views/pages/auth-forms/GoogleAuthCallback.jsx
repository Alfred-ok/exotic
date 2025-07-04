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
