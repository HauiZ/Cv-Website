import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      if (res.data.token) {
        login(res.data.token);
        toast.success('Đăng nhập thành công!');
        navigate("/");
      } else {
        setMessage("Login failed: No token received");
      }
    } catch (err) {
      setMessage("Sai thông tin đăng nhập");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <hr className="my-4" />

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Login with Google
        </button>

        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
