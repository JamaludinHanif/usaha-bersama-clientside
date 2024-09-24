import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/authentication/Login";
import NotFound from "./pages/404page";
import loginImg from "../public/logImg.png";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./pages/authentication/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Tes from "./pages/Tes";
import IndexUser from "./pages/forUser/indexUser/IndexUser";
import Profile from "./pages/forUser/profile/Profile";
import IndexCashier from "./pages/forCashier/index/IndexCashier";
import SelectProducts from "./pages/forCashier/Payment/SelectProducts";
import Precheckout from "./pages/forCashier/Payment/Precheckout";
import Cart from "./pages/forUser/Cart/Cart";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/pilih-barang", element: <SelectProducts /> },
  { path: "/precheckout", element: <Precheckout /> },
  { path: "/tes", element: <Tes />},
  { path: "/home", element: <IndexUser />},
  { path: "/profile", element: <Profile />},
  { path: "/cashier", element: <IndexCashier />},
  { path: "/cart", element: <Cart />},
];

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk login */}
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                <MainLayout>{route.element}</MainLayout>
              </ProtectedRoute>
            }
          />
        ))}

        {/* Redirect root ke dashboard */}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
