import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../../components";
import { loginTypes } from "./types/types";
import { loginService } from "./services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useFetchTheme from "../../hooks/useFetchTheme";

function Login() {
  const navigate = useNavigate();
  const { theme, loading } = useFetchTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<loginTypes>({ username: "", password: "" });

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
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <Loader />; 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        background: theme.theme === "dark" ? "#1D2671" : theme.colors.secondary,
      }}
    >
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-center text-2xl font-bold" style={{ color: theme.colors.primary }}>
          Let's Get Started
        </h2>
        <p className="text-center text-gray-600">Sign in to continue.</p>

        <form className="mt-6 space-y-4" onSubmit={submitHandler}>
          <input
            id="username"
            name="username"
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm"
            type="text"
            required
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
          />

          <input
            id="password"
            name="password"
            className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          />

          <motion.button
            type="submit"
            className="w-full rounded-md px-4 py-2 text-white font-semibold shadow"
            style={{ background: theme.colors.primary }}
            whileTap={{ scale: 0.95 }}
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
