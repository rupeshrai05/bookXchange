import { useState } from "react";
import { loginApi } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginApi({ email, password });
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden font-sans">
       {/* Background Blob */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
             <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
             <input
              className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
             <input
              type="password"
              className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
             disabled={loading}
             className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-transform transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
