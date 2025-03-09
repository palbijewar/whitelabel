import { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Cookies from "js-cookie"; 

/**
 * Checks if the user is authenticated based on the presence of an access token.
 * @returns {boolean} - True if authenticated, otherwise false.
 */
const isAuthenticated = (): boolean => {
  return Cookies.get("access_token") ? true : false;
};

// Define prop types
interface RouteProps {
  element: ReactElement;
}

/**
 * Protects routes that require authentication.
 * Redirects unauthenticated users to the login page.
 */
const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

/**
 * Prevents authenticated users from accessing public routes.
 * Redirects them to the dashboard if already logged in.
 */
const PublicRoute: React.FC<RouteProps> = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Signup />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
