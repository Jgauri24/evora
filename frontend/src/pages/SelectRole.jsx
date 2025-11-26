import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { setRole as setRoleAPI } from "../services/api";

const SelectRole = () => {
  const [role, setRole] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await setRoleAPI({ role, adminKey });

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("Error setting role:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Select Your Role</h1>

        {error && (
          <p className="text-red-600 bg-red-100 py-2 px-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setRole("user")}
            className={`px-6 py-3 border-2 rounded-xl font-semibold transition 
              ${role === "user" ? "bg-black text-white border-black" : "bg-white text-black border-gray-400 hover:border-black"}`}
          >
            I am a User
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`px-6 py-3 border-2 rounded-xl font-semibold transition 
              ${role === "admin" ? "bg-black text-white border-black" : "bg-white text-black border-gray-400 hover:border-black"}`}
          >
            I am an Admin
          </button>
        </div>

        {role === "admin" && (
          <input
            type="password"
            placeholder="Enter Admin Secret Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 
                     focus:ring-2 focus:ring-black focus:border-black"
          />
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold 
                   hover:bg-white hover:text-black border border-black transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
