import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import SelectRole from "./pages/SelectRole";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        {/* If logged in → go to dashboard */}
        <Route
          path="/"
          element={!token ? <Signup /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/select-role" replace />}
        />

        <Route
          path="/select-role"
          element={
            <ProtectedRoute>
              <SelectRole />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
<UserDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes> 
    </>
  );
}

export default App;
