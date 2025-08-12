import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import DarkModeBtn from "../../Components/DarkModebtn";
import mario_ready from "../../assets/mario_ready.svg";
import mario_loading from "../../assets/mario_loading.svg";
import { motion, useInView, AnimatePresence, easeInOut } from "motion/react";
import axios from "axios";

const Homepage = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  let navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const ToastShow = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      transition: Bounce,
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/user`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(res.data.user);

        toast.success(location.state.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
          transition: Bounce,
        });
        window.history.replaceState({}, document.title);
      } catch (err) {
        ToastShow(err.response.data.message);
      }
    };
    fetchUser();
  }, []);

  const [PlayModal, setPlayModal] = useState(false);
  const [ProfileModal, setProfileModal] = useState(false);
  const [leaderboardModal, setLeaderboardModal] = useState(false);

  const [marioReady, setMarioReady] = useState(false);

  const difficulty = useRef(null);
  const [selected, setSelected] = useState(null);
  const options = [
    { label: "3x3", value: 3 },
    { label: "4x4", value: 4 },
    { label: "5x5", value: 5 },
  ];
  const difficultySelect = (option) => {
    difficulty.current = option;
    setSelected(option.label);
    localStorage.setItem("difficulty", JSON.stringify(difficulty.current));
  };

  useEffect(() => {
    if (difficulty.current != null) {
      setMarioReady(true);
    } else {
      setMarioReady(false);
    }
  }, [selected]);

  const Text_ref = useRef(null);
  const isInView = useInView(Text_ref, { once: true });

  const words = ["Concentration", "Memory Matching", "Matching Pairs"];
  const [animateIndex, setAnimateIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const GameStartbtn = () => {
    if (!difficulty.current) {
      toast.error("Atleast set the difficulty first", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
    } catch {}
  };

  return (
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f1eaea] via-[#f4f2e4] to-[#d6d1ae] 
    dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_70%)] overflow-hidden  h-full w-full"
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {ProfileModal ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setProfileModal(false)}
        >
          <div
            className="relative w-3/4 lg:w-1/2 h-1/2 lg:h-3/4 p-6 rounded-2xl border
        border-white/30 dark:border-cyan-300
        bg-white/30 dark:bg-cyan-100/10
        backdrop-blur-md backdrop-saturate-200
        shadow-xl dark:shadow-cyan-500/20 animate-slideDown
        text-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-3 right-3 text-black dark:text-white 
        bg-white/40 dark:bg-cyan-900/30 hover:bg-white/60 dark:hover:bg-cyan-800/50
        p-2 rounded-full transition backdrop-blur-sm shadow-md"
            >
              <button
                onClick={() => setProfileModal(false)}
                className="border p-2 cursor-pointer bg-slate-300 dark:bg-slate-700 rounded-full
                 text-black dark:text-white hover:scale-110 transition"
              >
                ❌
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-2xl text-center font-bold dark:text-white text-black">
                Profile feature hitting soon!
              </p>
              <div className="mt-6 Username-container"></div>
            </div>
          </div>
        </div>
      ) : null}
      {leaderboardModal ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLeaderboardModal(false)}
        >
          <div
            className="relative p-6 rounded-2xl border border-white/30 bg-white/10 
                 dark:bg-white/10 backdrop-blur-md backdrop-saturate-200 shadow-xl 
                 w-3/4 lg:w-1/2 h-1/2 lg:h-3/4 animate-slideDown text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-3 right-3 text-white bg-white/20 hover:bg-white/30
                   dark:bg-white/10 dark:hover:bg-white/20 p-2 rounded-full transition"
            >
              <button
                onClick={() => setLeaderboardModal(false)}
                className="border p-2 cursor-pointer bg-slate-300 dark:bg-slate-700 rounded-full
                 text-black dark:text-white hover:scale-110 transition"
              >
                ❌
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-2xl text-center font-bold dark:text-white text-black">
                Leaderboards coming soon!
              </p>
              <div className="mt-6 Username-container"></div>
            </div>
          </div>
        </div>
      ) : null}
      {PlayModal ? (
        <div
          className="fixed inset-0 z-40 max-h-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setPlayModal(false)}
        >
          <div
            className="relative max-w-[95vw] lg:max-w-[600px] p-6 rounded-2xl border-2 
            bg-white/20 dark:bg-black/10
            shadow-[0_0_30px_rgba(255,0,255,0.5)] ring-2 ring-pink-500 ring-offset-2 ring-offset-white
      dark:ring-cyan-400 dark:ring-offset-black animate-slideDown transition-all duration-700 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-3 right-3 text-white bg-gradient-to-br from-pink-500 via-purple-500
         to-indigo-500  dark:from-cyan-400 dark:via-cyan-200 
        dark:to-cyan-600 p-1 rounded-full shadow-[0_0_12px_#ff00ff] hover:scale-110 transition-all"
            >
              <button
                onClick={() => setPlayModal(false)}
                className="border p-2 cursor-pointer bg-violet-300 dark:bg-slate-400 rounded-full
                 text-black dark:text-white hover:scale-110 transition"
              >
                ❌
              </button>
            </div>

            <div className="flex flex-col h-full lg:gap-7 gap-4">
              <div className="text-container flex flex-col lg:gap-5 gap-3">
                <p
                  className="text-4xl lg:text-6xl md:text-5xl -z-8 font-extrabold lg:font-bold
                   bg-clip-text bg-gradient-to-r from-black via-black to-black 
                  drop-shadow-[0_0_12px_#ff00ff] dark:from-cyan-300 dark:via-cyan-500 dark:to-cyan-300 
                  dark:drop-shadow-[0_0_15px_#00ffff] text-center p-3"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  «Rules»
                </p>

                <div className="rule-container">
                  {[
                    "♦️ Match all pairs of cards by flipping them two at a time.",
                    "♦️ Click any two cards to reveal their front. If both cards have the same symbol, they stay flipped. If they don’t match, they’ll flip back after a short delay.",
                    "♦️ Each successful match earns you 10 points. Match all card pairs except a Joker to win the game. Try to do it in the fewest moves and shortest time possible! 😎",
                  ].map((rule, index) => (
                    <p
                      key={index}
                      className="lg:text-xl text-base font-medium px-2 leading-relaxed text-black dark:text-white 
                      bg-clip-text bg-gradient-to-r from-slate-800 via-purple-800 to-slate-900 
                    dark:from-cyan-300 dark:via-cyan-500 dark:to-cyan-300 duration-500
                       drop-shadow-[0_0_20px_#cb3d17] dark:drop-shadow-[10px_5px_12px_#00ffff] transition-all"
                    >
                      {rule}
                    </p>
                  ))}
                </div>
              </div>

              <div className="Username-container flex gap-4 px-2 justify-center">
                <p
                  className="text-lg lg:text-xl font-extrabold tracking-wide bg-clip-text text-transparent 
               bg-gradient-to-r  from-indigo-700 via-blue-950 to-teal-900 
               dark:from-cyan-300 dark:via-cyan-500 dark:to-cyan-300
               
               drop-shadow-[0_0_10px_rgb(70,70,255)] dark:drop-shadow-[0_0_15px_#00ffff]"
                >
                  NICKNAME:
                </p>

                <p
                  className="text-lg lg:text-xl font-extrabold tracking-wide drop-shadow-[0_0_10px_rgb(70,70,255)] 
                 dark:drop-shadow-[0_0_10px_#00ffff] dark:text-blue-100 text-amber-950"
                >
                  {user.username}
                </p>
              </div>

              <div className="Difficulty-container flex flex-col items-center gap-4">
                <p
                  className=" text-xl font-extrabold tracking-wider 
               bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-blue-950 to-teal-900
               dark:from-cyan-300 dark:via-teal-400 dark:to-cyan-500 
               drop-shadow-[0_0_10px_rgb(70,70,255)] dark:drop-shadow-[0_0_15px_#00ffff]"
                >
                  Choose your Difficulty
                </p>
                <div
                  className="flex gap-8 border-2 border-amber-300 rounded-full p-1
               bg-white/30 dark:bg-black/20 backdrop-blur-md backdrop-saturate-150"
                >
                  {options.map((option) => {
                    return (
                      <p
                        className={`p-5 ${
                          selected == option.label
                            ? "bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-black dark:text-white shadow-lg"
                            : "bg-transparent text-black dark:text-white hover:bg-blue-200/30 dark:hover:bg-cyan-400/30"
                        }  
                        md:px-10 rounded-full hover:bg-green-400 cursor-pointer`}
                        key={option.value}
                        onClick={() => {
                          difficultySelect(option);
                        }}
                      >
                        {option.label}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="Game-start-btn-container flex justify-center">
                <button
                  className="group cursor-pointer border-2 border-pink-400 dark:border-cyan-300 text-black
                dark:text-white bg-white/20 dark:bg-black/20 hover:bg-pink-500 dark:hover:bg-cyan-500 
                hover:text-white px-5 lg:px-8 py-3 lg:py-4 rounded-full text-xl font-bold 
                   shadow-[0_0_10px_#ff00ff] dark:shadow-[0_0_10px_#00ffff] 
                   transition-all duration-500 hover:scale-105"
                  onClick={GameStartbtn}
                >
                  {marioReady ? (
                    <div className="group flex items-center gap-3">
                      <p>Let's-a-go!!</p>
                      <img
                        src={mario_ready}
                        className="size-11 animate-bounce"
                      ></img>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <p>Waiting for you</p>
                      <img src={mario_loading} className="size-10"></img>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        } main-container w-full mt-10`}
      >
        <div className="nav-container flex justify-center-safe sm:gap-0 gap-x-7 gap-y-3 flex-wrap">
          <div
            className="main-nav-container border-2 sm:w-1/2 md:w-1/3 lg:w-1/4 h-14 rounded-full flex justify-between overflow-hidden 
    bg-gradient-to-r from-green-200 via-blue-100 to-green-200 dark:from-[#253d75] dark:via-[#22457e] dark:to-[#0f172a]
    shadow-[0_5px_20px_rgba(79,70,229,1)] dark:shadow-[0_5px_20px_rgba(34,211,238,1)]
    transition-all duration-700 p-1"
          >
            <div
              className="relative flex-1 group cursor-pointer"
              onClick={() => {
                setProfileModal(!ProfileModal);
              }}
            >
              <div
                className="absolute inset-0 rounded-full 
                bg-gradient-to-r from-indigo-500 to-indigo-700 
               dark:from-cyan-400 dark:to-cyan-600 
                opacity-0 group-hover:opacity-80 
                transition-all duration-700"
              ></div>
              <div className="relative z-10 flex justify-center items-center h-full px-4 lg:px-7">
                <p
                  className="text-black dark:text-white font-extrabold lg:text-xl tracking-wide text-lg"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  Profile
                </p>
              </div>
            </div>

            <div
              className="relative flex-1 group cursor-pointer"
              onClick={() => {
                setLeaderboardModal(!leaderboardModal);
              }}
            >
              <div
                className="absolute inset-0 rounded-full 
              bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-cyan-400 dark:to-cyan-600 
                opacity-0 group-hover:opacity-80 transition-all duration-700"
              ></div>
              <div className="relative z-10 flex justify-center items-center h-full px-4 lg:px-7">
                <p
                  className="text-black dark:text-white font-bold tracking-wide lg:text-xl text-lg"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
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
          <motion.div>
            <p
              ref={Text_ref}
              className="text-center text-[clamp(1.875rem,5vw,4.5rem)] 
               font-extrabold text-shadow-purple-700 dark:text-cyan-400 
               animate-pulse drop-shadow-[0_0_5px_#ff00ff,_0_0_20px_#ff00ff]
               hover:rotate-x-10 hover:scale-110 transform transition-all duration-500 ease-in-out"
            >
              {"Welcome to the Game of".split("").map((letter, index) => {
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </p>
          </motion.div>
          <div className="">
            <AnimatePresence mode="wait">
              <motion.p
                key={words[animateIndex]}
                initial={{ opacity: 0, y: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 500, opacity: 0 }}
                transition={{ duration: 2, ease: easeInOut }}
                className="text-center text-[clamp(3rem,10vw,8rem)]  w-full break-words font-extrabold
                bg-gradient-to-r from-indigo-400 via-blue-400 to-sky-500 
             dark:from-amber-100 dark:via-yellow-500 dark:to-amber-100
              bg-clip-text text-transparent  drop-shadow-[0_0_8px_#ff0000]
              dark:drop-shadow-[0_0_15px_#ff00ff] 
              transform transition-all duration-500 ease-in-out hover:scale-115 "
              >
                {words[animateIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="Play-button-container flex justify-center pt-6">
            <motion.button
              whileTap={{ scale: 0.7 }}
              onClick={() => {
                setPlayModal(!PlayModal);
              }}
              className="mt-5 p-3 lg:pb-4 lg:pr-6 rounded-full lg:w-1/5 md:w-1/4 w-1/3 cursor-pointer 
              border border-purple-500 
                bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600
               text-pink-300 dark:text-cyan-300 
              animate-bounce shadow-[0_10px_20px_#502424] dark:shadow-[0_5px_20px_rgb(255,249,178,0.8)] 
               font-extrabold text-shadow-sm"
            >
              <p
                className="text-2xl lg:text-4xl dark:text-shadow-lg/100 dark:text-shadow-amber-600
               text-shadow-rose-950 text-shadow-lg/100"
              >
                🚨 Start
              </p>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
