import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components";

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#C33764] via-[#1D2671]">
        
        <div className="relative z-10 w-full max-w-md min-h-[500px] flex flex-col justify-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-900">Let's Get Started</h2>
          <p className="text-center text-gray-600">Sign in to continue to PrimeAlgo Tech.</p>

          <div className="mt-4 p-4 bg-gray-100 border-l-4 border-indigo-600 rounded-md">
            <p className="text-sm font-semibold text-gray-800">Note!</p>
            <p className="text-sm text-gray-600">Customer Support: +91-8602988771</p>
            <p className="text-sm text-gray-600">Email: support@primealgotech.com</p>
          </div>
  
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address / Phone Number
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
  
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
  
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 text-center"
            >
              {!isLoading ? "Login" : <Loader />}
            </button>
          </form>
  
          <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => navigate("/register")} className="font-semibold text-indigo-600 hover:text-indigo-500">
          Register
          </button>
        </p>
        </div>
      </div>
    );
  }
  
  export default Login;