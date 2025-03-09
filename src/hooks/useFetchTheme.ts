import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import interceptorInstance from "../middleware/interceptors";
import toast from "react-hot-toast"; 

interface ThemeData {
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

const defaultTheme: ThemeData = {
  theme: "dark",
  colors: {
    primary: "#0066cc",
    secondary: "#f5f5f5",
    accent: "#ff9900",
  },
  fonts: {
    heading: "Roboto",
    body: "Open Sans",
  },
};

export default function useFetchTheme() {
  const [theme, setTheme] = useState<ThemeData>(defaultTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const host_id = Cookies.get("host_id");
        const token = Cookies.get("access_token"); 

        console.log({ host_id, token });

        if (!host_id) {
          console.warn("⚠️ No host_id found in cookies. Using default theme.");
          setTheme(defaultTheme);
          setLoading(false);
          return;
        }

        if (!token) {
          console.warn("⚠️ No access_token found. Using default theme.");
          toast.error("Session expired. Please log in again.");
          setTheme(defaultTheme);
          setLoading(false);
          return;
        }

        const response = await interceptorInstance.get(`/hosts/${host_id}/template`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "success") {
          const parsedTheme = JSON.parse(response.data.data.template);
          setTheme(parsedTheme);
        } else {
          console.error("❌ Failed to fetch theme:", response.data.message);
          toast.error("Failed to load theme. Using default.");
        }
      } catch (error: unknown) {
        console.error("❌ Error fetching theme:", error);
        toast.error("Error loading theme. Using default.");
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  return { theme, loading };
}
