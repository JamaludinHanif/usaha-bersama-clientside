import { Navigate } from "react-router-dom";
import { notification } from "antd";

const ProtectedRoute = ({ children }) => {

  const isLoggedIn = sessionStorage.getItem("@isLoggedIn");

  return isLoggedIn == 'true' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
