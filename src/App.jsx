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
import SelectProducts from "./pages/kasir/SelectProducts";
import MainLayout from "./components/layout/MainLayout";
import Kalender from "./pages/kalender/Kalender";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/select-product", element: <SelectProducts /> },
  { path: "/kalender", element: <Kalender />}
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
