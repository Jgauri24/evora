import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        {/* Redirect logged-in users to dashboard */}
        <Route
          path="/"
          element={!token ? <Signup /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
