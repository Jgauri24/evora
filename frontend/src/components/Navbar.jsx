import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          EventSphere
        </Link>

        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link to="/events" className="text-gray-700 hover:text-black font-medium transition-colors">
                Events
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-black font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/bookings" className="text-gray-700 hover:text-black font-medium transition-colors">
                My Bookings
              </Link>
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:bg-gray-800 transition-colors"
                title="Profile"
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/events" className="text-gray-700 hover:text-black font-medium transition-colors">
                Events
              </Link>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}