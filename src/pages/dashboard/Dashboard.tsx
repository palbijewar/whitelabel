import { useEffect } from "react";
import { Navbar } from "../../components";
import useFetchTheme from "../../hooks/useFetchTheme";

function Dashboard() {
  const { theme } = useFetchTheme();

  useEffect(() => {
    console.log("useFetchTheme", theme);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4">{theme?.template?.primary}</div>
    </div>
  );
}

export default Dashboard;