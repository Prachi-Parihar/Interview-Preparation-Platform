import React from 'react'
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.js";
import api from "../utils/api.js";

const LoginModel = ({ onClose, setUser }) => {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      const response = await api.post("/auth/login", { token });

      setUser(response.data.user);

      onClose();
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-md">

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-2xl"
      >

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

        <div className="relative p-7">

          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>

          <div className="pt-4 text-center">

            <h2 className="text-2xl font-semibold text-white">
              Sign In to{" "}
              <span className="text-gray-400">
                InterviewAI
              </span>
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Continue your AI interview journey
            </p>

            <motion.button
              onClick={handleGoogleLogin}
              whileTap={{ scale: 0.97 }}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-black hover:bg-gray-100"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </motion.button>

            <p className="mt-6 text-xs text-gray-500">
              Secure authentication powered by Firebase
            </p>

          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginModel
