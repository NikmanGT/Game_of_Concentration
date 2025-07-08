import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import DarkModeBtn from "../../Components/DarkModebtn";

const Homepage = () => {
  let navigate = useNavigate();
  const [PlayModal, setPlayModal] = useState(false);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 900);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    setPlayModal(!PlayModal);
  };

  // const handleClick = () => {
  //   const userName = prompt("Enter your username Player:");
  //   localStorage.setItem("user", userName);
  //   if (userName) {
  //     navigate("/matchRoom");
  //   } else {
  //     navigate("/");
  //   }
  // };

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] 
    dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_70%)] overflow-hidden"
    >
      {PlayModal ? (
        <div
          className="z-10 main-modal-container animate-slideDown transition-all duration-500 ease-out absolute
           lg:left-1/4 left-1/8 top-1/4 lg:top-1/5 h-1/2 lg:h-3/4 w-3/4 lg:w-1/2 border-amber-200 
           border-2 rounded-xl"
        >
          <div className="close-modal-container absolute right-0">
            <button
              onClick={() => {
                setPlayModal(!PlayModal);
              }}
              className="border-2 p-2 bg-slate-400 cursor-pointer rounded-xl"
            >
              ❌
            </button>
          </div>
          <div className="Username-container"></div>
        </div>
      ) : null}
      <div
        className={`transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        } main-container w-full mt-10`}
      >
        <div className="nav-container flex justify-center-safe sm:gap-0 gap-x-7 gap-y-3 flex-wrap ">
          <div
            className="main-nav-container border-2 sm:w-1/2 md:w-1/3 lg:w-1/4 h-14 rounded-full flex justify-between overflow-hidden 
    bg-gradient-to-r from-green-200 via-blue-100 to-green-200 dark:from-[#253d75] dark:via-[#22457e] dark:to-[#0f172a]
    shadow-[0_5px_20px_rgba(79,70,229,1)] dark:shadow-[0_5px_20px_rgba(34,211,238,1)]
    transition-all duration-700"
          >
            <div className="relative flex-1 group cursor-pointer">
              <div
                className="absolute inset-0 rounded-full 
                bg-gradient-to-r from-indigo-500 to-indigo-700 
               dark:from-cyan-400 dark:to-cyan-600 
                opacity-0 group-hover:opacity-80 
                transition-all duration-700"
              ></div>
              <div className="relative z-10 flex justify-center items-center h-full px-4 lg:px-7">
                <p className="text-black dark:text-white font-bold tracking-wide">
                  Profile
                </p>
              </div>
            </div>

            <div className="relative flex-1 group cursor-pointer">
              <div
                className="absolute inset-0 rounded-full 
              bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-cyan-400 dark:to-cyan-600 
                opacity-0 group-hover:opacity-80 transition-all duration-700"
              ></div>
              <div className="relative z-10 flex justify-center items-center h-full px-4 lg:px-7">
                <p className="text-black dark:text-white font-bold tracking-wide">
                  Leaderboard
                </p>
              </div>
            </div>
          </div>
          <div className="dark-mode-button sm:absolute right-1/10">
            <DarkModeBtn />
          </div>
        </div>
        <div className="hero-container relative top-40">
          <p
            className="text-center text-[clamp(1.875rem,5vw,4.5rem)] 
               font-extrabold text-shadow-purple-700 dark:text-cyan-400 
               animate-pulse drop-shadow-[0_0_5px_#ff00ff,_0_0_20px_#ff00ff]
               hover:rotate-x-10 hover:scale-110 transform transition-all duration-500 ease-in-out
               "
          >
            Welcome to the Game of
          </p>
          <p
            className="text-center text-[clamp(3rem,10vw,8rem)]  w-full break-words font-extrabold
            bg-gradient-to-r from-indigo-400 via-blue-400 to-sky-500 
             dark:from-amber-100 dark:via-yellow-500 dark:to-amber-100
              bg-clip-text text-transparent  drop-shadow-[0_0_8px_#ff0000]
              dark:drop-shadow-[0_0_15px_#ff00ff] 
              transform transition-all duration-500 ease-in-out 
              hover:rotate-1 hover:scale-115 "
          >
            Concentration
          </p>

          <div className="Play-button-container flex justify-center pt-6">
            <button
              onClick={handleClick}
              className="mt-5 p-3 lg:pb-4 lg:pr-6 rounded-full lg:w-1/5 md:w-1/4 w-1/3 cursor-grab 
              border border-purple-500 
                bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600
               text-pink-300 dark:text-cyan-300 
              animate-bounce shadow-[0_10px_20px_#502424] dark:shadow-[0_5px_20px_rgb(255,249,178,0.8)] 
              transition-all font-extrabold text-shadow-sm"
            >
              <p
                className="text-2xl lg:text-4xl dark:text-shadow-lg/100 dark:text-shadow-amber-600
               text-shadow-rose-950 text-shadow-lg/100"
              >
                🚨 Start
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
