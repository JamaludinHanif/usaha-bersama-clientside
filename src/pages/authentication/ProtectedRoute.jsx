import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true

  return isLoggedIn == true ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
