// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Loader } from "../../components";
// import { forgotPasswordTypes } from "./types/types";

// function ForgotPassword() {
//   const [isLoading, setIsLoading] = useState(false);
//    const [formData, setFormData] = useState<forgotPasswordTypes>({
//       email: "",
//     });
    
//       const submitHandler = async (e: React.FormEvent) => {
//         e.preventDefault();
        
//         setIsLoading(true);
//       // try {
//       //   const response = await loginService(formData);
//       //   if (response?.status === "success") {
//       //     localStorage.setItem("access_token", response?.data?.access_token);
//       //     router.push("/");
//       //   }
//       // } catch (error: unknown) {
//       //   toast.error(error?.response?.data?.message);
//       // } finally {
//       //   setIsLoading(false);
//       // }
//     };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#C33764] via-[#1D2671]"
//     >
//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="relative z-10 w-full max-w-md min-h-[250px] flex flex-col justify-center p-8 bg-white rounded-lg shadow-lg"
//       >
//         <motion.h2
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="text-center text-2xl font-bold text-gray-900"
//         >
//           Recover Password
//         </motion.h2>

//         <form className="mt-6 space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email address <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="email"
//               name="email"
//               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//               type="text"
//               required
//               autoComplete="email"
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
//               }
//             />
//           </div>

//           <motion.button
//             type="submit"
//             whileTap={{ scale: 0.95 }}
//             onClick={submitHandler}
//             className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 text-center"
//           >
//             {!isLoading ? "Reset" : <Loader />}
//           </motion.button>
//         </form>

      
//       </motion.div>
//     </motion.div>
//   );
// }

// export default ForgotPassword;


const ForgotPassword = () => {
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword