import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden font-sans">
      {/* Background Blob */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/50 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-transform transform active:scale-95 disabled:opacity-50 mt-2"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
