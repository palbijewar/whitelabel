import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../../components";
import { loginTypes } from "./types/types";
import { loginService } from "./services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<loginTypes>({
    username: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginService(formData);
      if (response?.status === "success") {
        localStorage.setItem("access_token", response?.data?.access_token);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
    }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#C33764] via-[#1D2671]"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md min-h-[500px] flex flex-col justify-center p-8 bg-white rounded-lg shadow-lg"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-2xl font-bold text-gray-900"
        >
          Let's Get Started
        </motion.h2>
        <p className="text-center text-gray-600">Sign in to continue to PrimeAlgo Tech.</p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 p-4 bg-gray-100 border-l-4 border-indigo-600 rounded-md"
        >
          <p className="text-sm font-semibold text-gray-800">Note!</p>
          <p className="text-sm text-gray-600">Customer Support: +91-8602988771</p>
        </motion.div>

        <form className="mt-6 space-y-4" onSubmit={submitHandler}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username (Email / Phone) <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              type="text"
              required
              autoComplete="username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <a
                onClick={() => navigate("/forgot-password")}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              type="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 text-center"
          >
            {!isLoading ? "Login" : <Loader />}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register
          </motion.button>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Login;
