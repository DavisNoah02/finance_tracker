import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <h1 className="text-2xl md:text-4xl font-extrabold text-green-300 tracking-tight">
        Expense Tracker
      </h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:inline text-sm md:text-base">Welcome, <span className="font-semibold">{user.email}</span></span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-100 transition font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-100 transition font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}