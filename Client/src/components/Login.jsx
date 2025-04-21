// Example: src/components/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      <form
        onSubmit={e => {
          e.preventDefault();
          onLogin(email, password);
        }}
        className="space-y-4"
      >
        <input
          type="email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
      <div className="flex justify-between mt-4 text-sm">
        <Link to="/forgotpassword" className="text-blue-600 hover:underline">Forgot Password?</Link>
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </div>
    </div>
  );
}