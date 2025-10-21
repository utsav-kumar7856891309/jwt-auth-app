import React from "react";
import { useContext ,useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  useEffect(() => {
  if (!user) alert("Session expired. Please log in again!");
}, [user]);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">JWT Auth App</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <Link className="mr-4" to="/wifi-scanner">Wi‑Fi Scanner</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="mr-4 hover:underline" to="/login">Login</Link>
            <Link className="hover:underline" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

