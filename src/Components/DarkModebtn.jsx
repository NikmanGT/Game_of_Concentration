import { IoMoon } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const DarkModeBtn = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  const toggleDarkMode = () => setDark((prev) => !prev);

  return (
    <div className="dark-mode-btn">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-full border-2 border-pink-500 dark:border-cyan-300 
                     bg-pink-400 dark:bg-cyan-400 text-white dark:text-gray-900  
                     shadow-[0_0_15px_#ec4899] dark:shadow-[0_0_15px_#22d3ee]
                     hover:scale-105 font-bold tracking-wide cursor-pointer"
        onClick={toggleDarkMode}
      >
        {dark ? <FiSun className="size-5" /> : <IoMoon className="size-5" />}
      </motion.button>
    </div>
  );
};

export default DarkModeBtn;
