import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { admin } = useContext(AuthContext);
  return admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
