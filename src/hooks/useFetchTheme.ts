import Cookies from "js-cookie";
import interceptorInstance from "../middleware/interceptors";
import toast from "react-hot-toast";
import useUserTheme from "./useGetTheme";
import { useEffect } from "react";
import { AxiosError } from "axios";

export default function useFetchTheme() {
  const [theme, saveTheme] = useUserTheme();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const host_id = Cookies.get("host_id");

        const response = await interceptorInstance.get(
          `/hosts/${host_id}/template`
        );

        const parsedTheme = JSON.parse(response.data.data.template);
        saveTheme(parsedTheme);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Login failed. Please try again."
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    };

    fetchTheme();
  }, []);

  return { theme };
}
