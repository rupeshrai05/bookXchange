import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          BookXchange
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <Link to="/my-books" className="hover:text-white transition">My Books</Link>
              <Link to="/exchanges" className="hover:text-white transition">Exchanges</Link>
            </>
          ) : (
            <>
              <a href="/#about" className="hover:text-white transition">About</a>
              <a href="/#features" className="hover:text-white transition">Features</a>
              <a href="/#faq" className="hover:text-white transition">FAQ</a>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center">
          {user ? (
            <div className="flex items-center gap-4">
               <span className="hidden md:block text-gray-400 text-sm">Hi, {user.name?.split(" ")[0]}</span>
               <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm border border-red-500/50 text-red-400 rounded-full hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:block px-5 py-2 text-sm text-white hover:text-blue-400 transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
