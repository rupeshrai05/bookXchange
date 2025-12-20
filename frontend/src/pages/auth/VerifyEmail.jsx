import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const startVerification = async () => {
        if (!token) {
            setStatus("error");
            setMessage("No verification token found.");
            return;
        }

        try {
            await axios.get(`/api/auth/verify-email/${token}`); // Use API helper if possible, or direct axios
            setStatus("success");
            setMessage("Email verified successfully! You can now login.");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setStatus("error");
            setMessage(error.response?.data?.message || "Verification failed. Token might be invalid or expired.");
        }
    };

    startVerification(); // React 18 double-mount may trigger twice in Dev, usually harmless for GET
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        
        {status === "verifying" && (
            <div className="text-blue-400 animate-pulse">Verifying your email...</div>
        )}

        {status === "success" && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-green-400"
            >
                <div className="text-4xl mb-2">✅</div>
                <p>{message}</p>
                <p className="text-sm text-gray-500 mt-4">Redirecting to login...</p>
            </motion.div>
        )}

        {status === "error" && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-red-400"
            >
                <div className="text-4xl mb-2">❌</div>
                <p>{message}</p>
                 <button 
                    onClick={() => navigate("/login")}
                    className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition-colors"
                >
                    Go to Login
                </button>
            </motion.div>
        )}
      </motion.div>
    </div>
  );
}
