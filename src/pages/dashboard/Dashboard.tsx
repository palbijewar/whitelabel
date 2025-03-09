import { useEffect } from "react"
import { Navbar } from "../../components"
import { getUserDetails, getUserTheme } from "./services"
import toast from "react-hot-toast"
import useUserTheme from "../../hooks/useGetTheme";
import { AxiosError } from "axios";


function Dashboard() {
  const [saveTheme] = useUserTheme();
const getDetails = async () => {
  try {
    const response = await getUserDetails()
    if(response?.status=="success"){
      const themeData = await getUserTheme(response?.data?.host_id);
      const parsedTheme = themeData?.data?.template ? JSON.parse(themeData?.data?.template) : null;
      saveTheme(parsedTheme);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } else {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
    }
  }
}

useEffect(()=>{
 getDetails()
},[])

  return (
    <div>
    <Navbar />
    <div className="p-4">Dashboard</div>
  </div>
  )
}

export default Dashboard