import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('userRole');

  if (!role) {
    return <Navigate to="/pages/login" replace />;
  }

  return children;
};

export default ProtectedRoute;