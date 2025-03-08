import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useState } from "react";
import { motion } from "framer-motion";
import { signUpTypes } from "./types/types";

function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<signUpTypes>({
        email: "",
        password: "",
        name: "",
        mobile: "",
        user_type: "regular", // Default user type
    });

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsLoading(true);
        try {
            const response = await fetch("http://182.70.249.152:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            if (data.status === "success") {
                alert("Signup successful! Please login.");
                navigate("/login");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                
                <form className="mt-6 space-y-4" onSubmit={submitHandler}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="block w-full rounded-md border px-3 py-2"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="Mobile Number"
                        className="block w-full rounded-md border px-3 py-2"
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="block w-full rounded-md border px-3 py-2"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="block w-full rounded-md border px-3 py-2"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <motion.button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded"
                    >
                        {!isLoading ? "Signup" : <Loader />}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Signup;
