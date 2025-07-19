import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import CardBack from "../../assets/Card_back.svg";
import DarkModeBtn from "../../Components/DarkModebtn";
import { BsStopwatch } from "react-icons/bs";
import JokerCard from "../../assets/Joker.svg";
import Card1 from "../../assets/Heart_Ace.svg";
import Card2 from "../../assets/Heart_02.svg";
import Card3 from "../../assets/Heart_03.svg";
import Card4 from "../../assets/Heart_04.svg";
import Card5 from "../../assets/Heart_05.svg";
import Card6 from "../../assets/Heart_06.svg";
import Card7 from "../../assets/Heart_07.svg";
import Card8 from "../../assets/Heart_08.svg";
import Card9 from "../../assets/Heart_09.svg";
import Card10 from "../../assets/Heart_10.svg";
import Card11 from "../../assets/Heart_Queen.svg";
import Card12 from "../../assets/Heart_King.svg";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../../assets/Playing cards spinning loader.json";
import { motion } from "motion/react";
import Confetti from "react-confetti";

const MatchRoom = () => {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || !storedTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTimeout(() => {
      setLoading(!loading);
    }, 2700);
  }, []);

  const intervalRef = useRef(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }, 2700);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalRef.current);
    };
  }, []);

  const userName = localStorage.getItem("username");

  const difficulty = JSON.parse(localStorage.getItem("difficulty"));
  const gridSize = difficulty.value;
  const totalSlots = gridSize * gridSize;

  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [exitGameModal, setExitGameModal] = useState(false);

  const [time, setTime] = useState(0);

  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [winModal, setWinModal] = useState(false);
  const { width, height } = [window.innerWidth, window.innerHeight];

  useEffect(() => {
    if (
      matchedCards.length ===
      (totalSlots % 2 === 0 ? totalSlots : totalSlots - 1)
    ) {
      clearInterval(intervalRef.current);
      setShowConfetti(true);
      setTimeout(() => {
        setWinModal(true);
      }, 1500);
    }
  }, [matchedCards, totalSlots]);

  const cardImages = {
    "Card 1": Card1,
    "Card 2": Card2,
    "Card 3": Card3,
    "Card 4": Card4,
    "Card 5": Card5,
    "Card 6": Card6,
    "Card 7": Card7,
    "Card 8": Card8,
    "Card 9": Card9,
    "Card 10": Card10,
    "Card 11": Card11,
    "Card 12": Card12,
    dummy: JokerCard,
  };

  const gridCol = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  }[gridSize];

  const shuffleCards = (cardArr) => {
    const arr = [...cardArr];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateCards = () => {
    const allAvailable = 12;
    const pairCount = Math.floor(totalSlots / 2);

    const maxStart = allAvailable - pairCount;
    const startIndex = Math.floor(Math.random() * (maxStart + 1));
    const selectedIndices = Array.from(
      { length: pairCount },
      (_, i) => startIndex + i + 1
    );

    const DuplicateArr = [...selectedIndices, ...selectedIndices];

    if (DuplicateArr.length < totalSlots) {
      DuplicateArr.push("dummy");
    }

    const ShuffledArr = shuffleCards(DuplicateArr);

    return ShuffledArr.map((val, index) => ({
      id: index,
      value: val === "dummy" ? "dummy" : `Card ${val}`,
    }));
  };
  const [cards, setCards] = useState(generateCards);

  const resetGame = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setExitGameModal(false);
    setShowConfetti(false);
    setCards(generateCards());
    intervalRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handleFlip = (card) => {
    if (
      flippedCards.includes(card.id) ||
      matchedCards.includes(card.id) ||
      card.value == "dummy"
    )
      return;

    const newFlip = [...flippedCards, card.id];
    setFlippedCards(newFlip);

    if (newFlip.length == 2) {
      setMoves((moves) => (moves += 1));

      const [firstFlip, secondFlip] = newFlip.map((id) =>
        cards.find((c) => c.id == id)
      );

      if (firstFlip.value == secondFlip.value) {
        setMatchedCards((prev) => [...prev, firstFlip.id, secondFlip.id]);
        setScore((score) => (score += 10));
        setTimeout(() => setFlippedCards([]), 800);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div
      className="absolute inset-0 -z-10 w-full 
      bg-gradient-to-b from-[#e9aad1] via-[#a8e7a8] to-[#aedef8]
      dark:bg-gradient-to-b dark:from-[#0d0d1e] dark:via-[#131325] dark:to-[#262670] 
       transition-all duration-500 border-4 overflow-hidden"
    >
      {loading ? (
        <div className="mx-auto relative top-[30vh]">
          <Player className="size-56" autoplay loop src={Loader}></Player>
          <div className="text-container text-2xl md:text-3xl lg:text-4xl dark:text-white text-center mt-10">
            Good Luck Player....
          </div>
        </div>
      ) : (
        <>
          {exitGameModal ? (
            <div
              className="fixed inset-0 z-40 max-h-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setExitGameModal(false)}
            >
              <div
                className="main-container relative border-amber-200 border-2 animate-slideDown max-w-[95vw]
             flex flex-col gap-10 p-6 rounded-2xl bg-white/20 dark:bg-black/10 shadow-[0_0_30px_rgba(255,0,255,0.5)] 
             ring-2 ring-pink-500 ring-offset-2 ring-offset-white dark:ring-cyan-400
              dark:ring-offset-black animate-slideDown transition-all duration-700 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-container">
                  <p
                    className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent 
               bg-gradient-to-r  from-[#3b0303] via-[#46053c] to-[#46053c] 
               dark:from-cyan-300 dark:via-cyan-500 dark:to-cyan-300
               drop-shadow-[0_0_20px_rgb(70,70,255)] dark:drop-shadow-[0_0_15px_#00ffff] uppercase text-center p-10"
                  >
                    Are you sure you want to exit the Game ?
                  </p>
                </div>
                <div className="btn-container flex justify-around">
                  <button
                    onClick={() => setExitGameModal(!exitGameModal)}
                    className="group relative overflow-hidden rounded-xl border-2 border-amber-300 px-6 py-3 
                    text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out 
                    bg-gradient-to-br from-[#474ccf] via-[#61d6c1] to-[#c5eb6e] text-black shadow-md 
                    hover:scale-105 hover:ring-2 hover:ring-amber-500 hover:shadow-lg
                   dark:from-cyan-700 dark:via-cyan-400 dark:to-yellow-400 cursor-pointer
                   dark:text-slate-900 dark:hover:text-white dark:hover:bg-amber-950"
                  >
                    <p className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#fffa]">
                      No Continue
                    </p>
                  </button>
                  <button
                    className="group relative overflow-hidden rounded-xl border-2 border-amber-300 px-6 py-3 
                    text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out 
                    bg-gradient-to-br from-[#474ccf] via-[#61d6c1] to-[#c5eb6e] text-black shadow-md 
                    hover:scale-105 hover:ring-2 hover:ring-amber-500 hover:shadow-lg
                   dark:from-cyan-700 dark:via-cyan-400 dark:to-yellow-400 cursor-pointer 
                   dark:text-slate-900 dark:hover:text-white dark:hover:bg-amber-950"
                    onClick={() => navigate("/")}
                  >
                    <p className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#fffa]">
                      To Homepage
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {winModal ? (
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, duration: 2, delay: 2 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, duration: 3, delay: 4 }}
                className="mx-auto main-container w-[90vw] max-w-xl rounded-2xl p-6 sm:p-8 bg-white/60 dark:bg-black/40 
               shadow-2xl backdrop-blur-lg border border-white/30 dark:border-white/20"
              >
                <div className="hero-text-cont text-center space-y-4">
                  <h2
                    className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white 
                   drop-shadow-sm dark:drop-shadow-[0_0_10px_#fff5]"
                  >
                    You Won 🎉🎉
                  </h2>

                  <hr className="border-t border-slate-300 dark:border-slate-600 my-4" />

                  <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200">
                    You finished the Game of{" "}
                    <span className="font-semibold">{difficulty.label}</span>{" "}
                    difficulty
                    <br />
                    within <span className="font-semibold">{time}s</span> in a
                    total of <span className="font-semibold">{moves}</span>{" "}
                    moves.
                  </p>

                  <div className="btn-container flex justify-center gap-4 mt-6">
                    <button
                      onClick={() => {
                        resetGame();
                        setWinModal(false);
                      }}
                      className="rounded-xl px-6 py-3 font-semibold text-black dark:text-slate-900
                      bg-gradient-to-br from-[#474ccf] via-[#61d6c1] to-[#c5eb6e]
                      border border-amber-300 hover:ring-2 hover:ring-amber-500
                       transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer
                     dark:from-cyan-700 dark:via-cyan-400 dark:to-yellow-400
                     dark:hover:text-white dark:hover:bg-amber-950 shadow-md"
                    >
                      Play Again
                    </button>

                    <button
                      onClick={() => navigate("/")}
                      className="rounded-xl px-6 py-3 font-semibold text-black dark:text-slate-900
                      bg-gradient-to-br from-[#474ccf] via-[#61d6c1] to-[#c5eb6e]
                       border border-amber-300 hover:ring-2 hover:ring-amber-500 cursor-pointer
                         transition-transform duration-300 ease-in-out hover:scale-105
                       dark:from-cyan-700 dark:via-cyan-400 dark:to-yellow-400
                     dark:hover:text-white dark:hover:bg-amber-950 shadow-md"
                    >
                      To Homepage
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
          <div className="main-matchroom-container flex lg:flex-row flex-col h-full">
            <div
              className="stats-container lg:w-1/4 flex lg:flex-col justify-between lg:p-3 lg:px-1 lg:border-r-3
        lg:dark:border-cyan-400 lg:dark:shadow-slate-600 shadow-lg shadow-slate-7000 rounded-sm"
            >
              <div
                className="text-container p-3 lg:px-2 md:p-2 md:pl-8 space-y-2 text-black dark:text-amber-300 
          font-semibold"
              >
                <p className="text-xl lg:text-2xl break-words">👤 {userName}</p>
                <p className="text-xl lg:text-2xl">🎯 Moves: {moves}</p>
                <p className="text-xl lg:text-2xl">🏆 Score: {score}</p>
                <p className="text-xl lg:text-2xl">
                  📏 Difficulty: {difficulty.label}
                </p>
              </div>

              <div className="game-btns flex-col justify-items-center p-2">
                <DarkModeBtn />
                <motion.button
                  whileTap={{ scale: 0.6 }}
                  className="lg:hidden mt-4 px-4 py-3 font-semibold rounded-full cursor-pointer 
                   text-white bg-gradient-to-br from-fuchsia-700 to-violet-800
              hover:from-purple-500 hover:to-pink-600 hover:shadow-[0_0_20px_#ff00ff]
               dark:bg-gradient-to-br dark:from-red-500 dark:to-green-300
            dark:hover:from-teal-400 dark:hover:to-cyan-300
              dark:shadow-[0_0_10px_#00ffff] shadow-[0_0_20px_#99004C]"
                  onClick={() => resetGame()}
                >
                  Refresh Game
                </motion.button>
              </div>
            </div>

            <div className="Playing-Area w-full flex flex-col overflow-hidden">
              <div
                className="Upper-container border-b-3 dark:border-cyan-400 dark:shadow-amber-300 shadow-lg
                 shadow-slate-700 w-full flex justify-between items-center flex-wrap gap-3 p-4"
              >
                <div
                  className="bg-amber-200 lg:min-w-[15vw] text-black rounded-full px-5 py-2
                flex gap-2 justify-center items-center drop-shadow-2xl
                shadow-[0_0_10px_#20d140] dark:shadow-[0_0_15px_#22d3ee]"
                >
                  <BsStopwatch className="text-3xl" />
                  <p className="text-lg font-semibold text-center">
                    Timer: {time}
                  </p>
                </div>

                <div className="hidden lg:block">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="px-4 py-3 font-semibold rounded-full cursor-pointer
              text-white bg-gradient-to-br from-fuchsia-700 to-violet-800
              hover:from-purple-500 hover:to-pink-600 hover:shadow-[0_0_20px_#ff00ff]
               dark:bg-gradient-to-br dark:from-red-500 dark:to-green-300
            dark:hover:from-teal-400 dark:hover:to-cyan-300
              dark:shadow-[0_0_10px_#00ffff] shadow-[0_0_20px_#99004C]"
                    onClick={() => resetGame()}
                  >
                    Refresh Game
                  </motion.button>
                </div>

                <div>
                  <button
                    className="px-5 py-3  font-bold rounded-full transition-all duration-300 cursor-pointer
                bg-gradient-to-r from-yellow-950 to-amber-600 text-white border-none
              hover:from-indigo-800 hover:to-green-700 hover:shadow-[0_0_20px_#6c00ff]
                dark:from-cyan-500 dark:to-teal-600
                  dark:hover:from-teal-400 dark:hover:to-cyan-600
                dark:shadow-[0_0_20px_#00ffff] shadow-[0_0_30px_#f199e9]
                 ring-2 ring-amber-400 hover:ring-fuchsia-500 dark:ring-cyan-400 dark:ring-offset-black"
                    onClick={() => setExitGameModal(!exitGameModal)}
                  >
                    End Game
                  </button>
                </div>
              </div>

              <div
                className={`Card-area grid ${gridCol} gap-2 sm:gap-3 md:gap-4 p-3 justify-items-center h-full`}
              >
                {cards.map((card) => {
                  const isFlipped =
                    flippedCards.includes(card.id) ||
                    matchedCards.includes(card.id);

                  return (
                    <div
                      key={card.id}
                      className={`aspect-[2/3] rounded-sm flex justify-center items-center cursor-pointer 
                      transition-transform duration-300 hover:scale-105
                     ${
                       gridSize == 3
                         ? "h-[20vh] lg:h-[26vh]"
                         : gridSize == 4
                         ? "h-[15vh] lg:h-[20vh]"
                         : "h-[11.5vh] lg:h-[20vh]"
                     }`}
                      onClick={() => handleFlip(card)}
                      style={{ perspective: "1000px" }}
                    >
                      <motion.div
                        className="w-full h-full [transform-style:preserve-3d]"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <div
                          className="absolute w-full h-full [backface-visibility:hidden]"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <img
                            src={
                              card.value === "dummy"
                                ? cardImages["dummy"]
                                : CardBack
                            }
                            alt="Back"
                            className={`shadow-2xl drop-shadow-2xl
                               shadow-amber-900 bg-white dark:shadow-amber-300
                               ${
                                 card.value != "dummy"
                                   ? "border-red-700 border-4"
                                   : ""
                               }
                             `}
                          />
                        </div>

                        <div
                          className="absolute w-full h-full [backface-visibility:hidden]"
                          style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <motion.img
                            src={
                              card.value === "dummy"
                                ? cardImages["dummy"]
                                : cardImages[card.value]
                            }
                            alt={card.value}
                            className="object-contain rounded-sm shadow-2xl shadow-amber-900
                             dark:shadow-amber-300 bg-white"
                            animate={{
                              ...(matchedCards.includes(card.id) && {
                                boxShadow: [
                                  "0 0 0px rgba(255,255,0,0.0)",
                                  "0 0 20px rgba(255,255,0,0.8)",
                                  "0 0 40px rgba(255,255,0,0.6)",
                                  "0 0 20px rgba(255,255,0,0.8)",
                                  "0 0 0px rgba(255,255,0,0.0)",
                                ],
                              }),
                            }}
                            transition={{
                              duration: matchedCards.includes(card.id)
                                ? 1
                                : 0.8,
                              ease: "easeInOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default MatchRoom;
