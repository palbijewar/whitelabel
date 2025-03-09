import { useState } from "react";

const useUserTheme = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("userTheme");
    return storedTheme ? JSON.parse(storedTheme) : null;
  });

  const saveTheme = (newTheme:unknown) => {
    if (newTheme) {
      localStorage.setItem("userTheme", JSON.stringify(newTheme));
      setTheme(newTheme);
    }
  };

  return [theme, saveTheme];
};

export default useUserTheme;
