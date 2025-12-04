import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import UserDashboard from "./pages/UserDashboard";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import EventDetails from "./pages/EventDetails";

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
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
      </Routes>
    </>
  );
}

export default App;
