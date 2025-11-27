import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { token, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/');
  };
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-30 border-b">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary">EventSphere</Link>
        <div className="flex items-center gap-4">
          <Link to="/events" className="hover:text-primary">Events</Link>
          {token && (
            <>
              <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
              <Link to="/bookings" className="hover:text-primary">My Bookings</Link>
              <Link to="/profile" className="hover:text-primary">Profile</Link>
            </>
          )}
          {!token ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded-2xl bg-primary text-white">Login</Link>
              <Link to="/signup" className="px-4 py-2 rounded-2xl bg-accent text-white">Sign up</Link>
            </>
          ) : (
            <button onClick={logout} className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300">Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
}