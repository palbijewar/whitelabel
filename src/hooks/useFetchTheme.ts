import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import interceptorInstance from "../middleware/interceptors";

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

        if (!host_id) {
          console.warn("No host_id found in cookies. Using default theme.");
          setTheme(defaultTheme);
          setLoading(false);
          return;
        }

        const response = await interceptorInstance.get(`/hosts/${host_id}/template`);
    
        if (response.data.status === "success") {
          const parsedTheme = JSON.parse(response.data.data.template);
          setTheme(parsedTheme);
        } else {
          console.error("Failed to fetch theme:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  return { theme, loading };
}
