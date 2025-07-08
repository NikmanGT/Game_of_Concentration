import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import DarkModeBtn from "../../Components/DarkModebtn";

const Homepage = () => {
  let navigate = useNavigate();
  const [PlayModal, setPlayModal] = useState(false);
  const [ProfileModal, setProfileModal] = useState(false);
  const [leaderboardModal, setLeaderboardModal] = useState(false);

  // const userRef = useRef("");
  // const difficultyRef = useRef(0);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 900);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const Gamebtn = () => {
    navigate("/matchRoom");
  };

  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] 
    dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_70%)] overflow-hidden"
    >
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

            <div className="flex flex-col items-center justify-center border-1 h-full">
              <p className="text-2xl font-bold dark:text-white text-black">
                Enter your Profile
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
              className="float-right text-white bg-white/20 hover:bg-white/30
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
              <p className="text-2xl font-bold dark:text-white text-black">
                Leaderboard Scores
              </p>
              <div className="mt-6 Username-container"></div>
            </div>
          </div>
        </div>
      ) : null}

      {PlayModal ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setPlayModal(false)}
        >
          <div
            className="relative w-3/4 lg:w-1/2 p-6 rounded-2xl border-2 
        bg-white/20 dark:bg-black/10 
        backdrop-blur-lg backdrop-saturate-200
        shadow-[0_0_20px_rgba(255,0,255,0.6)]
        border-transparent 
        animate-slideDown
        text-black dark:text-white
        ring-2 ring-pink-500 ring-offset-2 ring-offset-white
        dark:ring-cyan-400 dark:ring-offset-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-3 right-3 text-white bg-gradient-to-br from-pink-500 via-purple-500
               to-indigo-500  dark:from-cyan-400 dark:via-cyan-200 
              dark:to-cyan-600 p-1 rounded-full shadow-[0_0_10px_#ff00ff] hover:scale-110 transition-all"
            >
              <button
                onClick={() => setPlayModal(false)}
                className="border p-2 cursor-pointer bg-violet-300 dark:bg-slate-400 rounded-full
                 text-black dark:text-white hover:scale-110 transition"
              >
                ❌
              </button>
            </div>

            <div className="flex flex-col h-full lg:gap-9 gap-4">
              <div className="text-container flex flex-col lg:gap-5 gap-3">
                <p
                  className="text-4xl lg:text-6xl md:text-5xl font-bold dark:text-white text-black
                 text-center p-3"
                >
                  «Rules»
                </p>

                <p className="lg:text-xl font-medium lg:font-normal">
                  ♦️ Match all pairs of cards by flipping them two at a time.
                </p>

                <p className="lg:text-xl font-medium lg:font-normal">
                  ♦️ Click any two cards to reveal their front. If both cards
                  have the same symbol, they stay flipped. If they don’t match,
                  they’ll flip back after a short delay.
                </p>

                <p className="lg:text-xl font-medium lg:font-normal">
                  ♦️ Each successful match earns you 10 points. Match all card
                  pairs to win the game. Try to do it in the fewest moves and
                  shortest time possible! 😎
                </p>
              </div>

              <div className="mt-6 Username-container flex gap-4">
                <p>Nickname:</p>
                <input
                  type="name"
                  // ref={userRef.current}
                  className="border-2 border-b-amber-600 w-full"
                ></input>
              </div>

              <div className="Difficulty-container flex flex-col items-center">
                <p className="p-3 text-xl">Choose your Difficulty</p>
                <div className="flex border-amber-300 rounded-full border-2 gap-8">
                  <p className="p-5 lg:px-6 rounded-full hover:bg-fuchsia-400 cursor-pointer ">
                    3x3
                  </p>
                  <p className="p-5 lg:px-6 rounded-full hover:bg-fuchsia-400 cursor-pointer">
                    4x4
                  </p>
                  <p className="p-5 lg:px-6 rounded-full hover:bg-fuchsia-400 cursor-pointer">
                    5x5
                  </p>
                </div>
              </div>

              <div className="Game-start-btn-container flex justify-center">
                <button
                  className="cursor-pointer border-1 p-3 lg:px-7 lg:p-4 rounded-full"
                  onClick={Gamebtn}
                >
                  <p className="text-xl">Let's-a go!!</p>
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
        <div className="nav-container flex justify-center-safe sm:gap-0 gap-x-7 gap-y-3 flex-wrap ">
          <div
            className="main-nav-container border-2 sm:w-1/2 md:w-1/3 lg:w-1/4 h-14 rounded-full flex justify-between overflow-hidden 
    bg-gradient-to-r from-green-200 via-blue-100 to-green-200 dark:from-[#253d75] dark:via-[#22457e] dark:to-[#0f172a]
    shadow-[0_5px_20px_rgba(79,70,229,1)] dark:shadow-[0_5px_20px_rgba(34,211,238,1)]
    transition-all duration-700"
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
                <p className="text-black dark:text-white font-bold tracking-wide">
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
               hover:rotate-x-10 hover:scale-110 transform transition-all duration-500 ease-in-out"
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
              onClick={() => {
                setPlayModal(!PlayModal);
              }}
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
