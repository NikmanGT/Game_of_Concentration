import { IoMoon } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";

const DarkModeBtn = () => {
  useEffect(() => {}, []);
  const [dark, setDark] = useState(true);
  const darkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="dark-mode-btn">
      <button
        className="p-4 rounded-full border-2 border-pink-500 dark:border-cyan-300 
                     bg-pink-400 dark:bg-cyan-400 
                     text-white dark:text-gray-900 
                     shadow-[0_0_15px_#ec4899] dark:shadow-[0_0_15px_#22d3ee]
                     hover:scale-105 transition-all duration-300 ease-in-out
                     font-bold tracking-wide cursor-pointer"
        onClick={darkMode}
      >
        {dark ? <FiSun className="size-5" /> : <IoMoon className="size-5" />}
      </button>
    </div>
  );
};

export default DarkModeBtn;
