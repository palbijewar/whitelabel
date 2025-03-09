import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useState } from "react";
import { motion } from "framer-motion";
import { signUpTypes } from "./types/types";
import { signUpUser } from "./services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { loginService } from "../login/services";
import { getUserDetails } from "../dashboard/services";
import Cookies from "js-cookie"; 

function Signup() {
    const navigate = useNavigate();
    const defaultTheme = {
        theme: "dark",
        colors: {
            primary: "#0066cc",
            secondary: "#f5f5f5",
            accent: "#ff9900"
        },
        fonts: {
            heading: "Roboto",
            body: "Open Sans"
        }
    };

    const currentTheme = defaultTheme;
    const isDarkMode = currentTheme.theme === "dark";

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<signUpTypes>({
        email: "",
        password: "",
        name: "",
        mobile: "",
        user_type: ""
    });

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const signupResponse = await signUpUser(formData);
            if (signupResponse?.status === "success") {
                const loginResponse = await loginService({
                    username: formData.email,
                    password: formData.password
                });

                const userDetails = await getUserDetails();
                if (userDetails?.data?.host_id) {
                  Cookies.set("host_id", userDetails?.data?.host_id, { expires: 7 }); 
                  Cookies.set("access_token", loginResponse?.data?.access_token, { expires: 7 }); 
                  navigate("/dashboard");
                } else {
                    toast.error("Login failed. Please try manually.");
                }
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
            className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8"
            style={{
                backgroundColor: isDarkMode ? "#1A1A1A" : currentTheme.colors.secondary,
                color: isDarkMode ? "#ffffff" : "#000000",
                fontFamily: currentTheme.fonts.body
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative z-10 w-full max-w-md min-h-[500px] flex flex-col justify-center p-6 sm:p-8 rounded-lg shadow-lg"
                style={{
                    backgroundColor: isDarkMode ? "#2C2C2C" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    fontFamily: currentTheme.fonts.heading
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h2 className="text-center text-2xl font-bold">Create an Account</h2>
                <p className="text-center text-sm sm:text-base">
                    Sign up to get started with PrimeAlgo Tech.
                </p>

                <form className="mt-6 space-y-4 w-full" onSubmit={submitHandler}>
                    {["name", "mobile", "email", "password"].map((field, index) => (
                        <motion.div
                            key={field}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <label htmlFor={field} className="block text-sm font-medium capitalize">
                                {field.replace("_", " ")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                id={field}
                                name={field}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                style={{
                                    backgroundColor: isDarkMode ? "#3A3A3A" : "#ffffff",
                                    color: isDarkMode ? "#ffffff" : "#000000",
                                    borderColor: isDarkMode ? "#555" : "#ccc"
                                }}
                                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                                required
                                autoComplete={field}
                                onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))}
                            />
                        </motion.div>
                    ))}

                    <motion.button
                        type="submit"
                        className="w-full rounded-md px-4 py-2 text-white font-semibold shadow flex items-center justify-center gap-2"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {!isLoading ? "Signup" : <Loader />}
                    </motion.button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="font-semibold hover:underline"
                        style={{ color: currentTheme.colors.primary }}
                    >
                        Login
                    </button>
                </p>
            </motion.div>
        </motion.div>
    );
}

export default Signup;
