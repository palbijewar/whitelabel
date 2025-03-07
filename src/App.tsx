import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForgotPassword, Login, Signup } from "./pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </Router>
  );
}

export default App;

