import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left side: Brand/Tagline */}
      <div>
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-cyan-600">
          Life, Planned Better
        </Link>
      </div>

      {/* Right side: Navigation */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-cyan-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/"
              className="text-white bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-medium"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-cyan-600 font-medium"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
