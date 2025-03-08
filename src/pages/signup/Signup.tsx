import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useState } from "react";
import { motion } from "framer-motion";
import { signUpTypes } from "./types/types";
import { signUpValidation } from "./validation/validation";

function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
     const [formData, setFormData] = useState<signUpTypes>({
        email: "",
        password: "",
        name:"",
        phoneNumber:"",
      });
      const [errorMessage, setErrorMessage] = useState({})

      const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = signUpValidation(formData, setErrorMessage);
        if (!isValid) {
            alert("Please correct the highlighted errors.");
            return;
        }
        console.log("Form submitted", formData);
        setIsLoading(true);
        // try {
        //   const response = await loginService(formData);
        //   if (response?.status === "success") {
        //     localStorage.setItem("access_token", response?.data?.access_token);
        //     router.push("/");
        //   }
        // } catch (error: unknown) {
        //   toast.error(error?.response?.data?.message);
        // } finally {
        //   setIsLoading(false);
        // }
      };

    return (
      <motion.div 
        className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#C33764] via-[#1D2671]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative z-10 w-full max-w-md min-h-[500px] flex flex-col justify-center p-8 bg-white rounded-lg shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-center text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-center text-gray-600">Sign up to get started with PrimeAlgo Tech.</p>
          
          <form className="mt-6 space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="text"
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
                }
              />
            </motion.div>
  
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="tel"
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
                }
              />
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="email"
                required
                autoComplete="email"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
                }
              />
            </motion.div>
  
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
                }
              />
            </motion.div>
  
            <motion.button
              type="submit"
              onClick={submitHandler}
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!isLoading ? "Signup" : <Loader />}
            </motion.button>
          </form>
  
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate("/login")} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </button>
          </p>
        </motion.div>
      </motion.div>
    );
  }
  
  export default Signup;
