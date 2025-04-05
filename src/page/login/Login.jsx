import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

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
        login(res.data.token); // Call login function to set the token
        navigate("/"); // Redirect to the homepage
      } else {
        setMessage("Login failed: No token received");
      }
    } catch (err) {
      setMessage("Sai thông tin đăng nhập");
    }
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
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Login</button>
        </form>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
