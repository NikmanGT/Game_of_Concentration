import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import CardBack from "../../assets/Card_back.svg";
import DarkModeBtn from "../../Components/DarkModebtn";
import { BsStopwatch } from "react-icons/bs";
import JokerCard from "../../assets/Joker.svg";
import Card1 from "../../assets/Heart_01.svg";
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

const MatchRoom = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const userName = localStorage.getItem("username");

  const difficulty = JSON.parse(localStorage.getItem("difficulty"));
  const gridSize = difficulty.value;
  const totalSlots = gridSize * gridSize;

  let navigate = useNavigate();

  const [exitGameModal, setExitGameModal] = useState(false);

  const [time, setTime] = useState(0);

  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const intervalRef = useRef(0);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (
      matchedCards.length ===
      (totalSlots % 2 === 0 ? totalSlots : totalSlots - 1)
    ) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        return alert(
          `Finishing a Simple Card Game in almost ${time}s, get better, anyways congrats`
        );
      }, 800);
    }
  }, [matchedCards, time, totalSlots]);

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
  const [cards] = useState(generateCards);

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
      className="absolute inset-0 -z-10 min-h-screen w-full 
      bg-gradient-to-b from-white via-purple-100 to-indigo-200 
      dark:bg-gradient-to-b dark:from-[#0d0d1e] dark:via-[#131325] dark:to-[#1a1a2e] 
      overflow-hidden transition-all duration-500"
    >
      {exitGameModal ? (
        <div
          className="fixed inset-0 z-40 max-h-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setExitGameModal(false)}
        >
          <div
            className="main-container border-amber-200 border-2 animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-container"></div>
            <div className="btn-container">
              <button onClick={() => setExitGameModal(!exitGameModal)}>
                ❌
              </button>
              <button onClick={() => navigate("/")}>✅</button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="main-matchroom-container flex lg:flex-row flex-col h-full">
        <div
          className="stats-container lg:w-1/4 flex lg:flex-col justify-between p-3 lg:border-r-3
        lg:dark:border-cyan-400 lg:dark:shadow-slate-600 shadow-lg shadow-slate-7000 backdrop-blur-md rounded-lg"
        >
          <div className="text-container p-3 md:pl-8 space-y-2 text-black dark:text-amber-300 font-semibold">
            <p className="text-xl lg:text-2xl break-words">👤 {userName}</p>
            <p className="text-xl lg:text-2xl">🎯 Moves: {moves}</p>
            <p className="text-xl lg:text-2xl">🏆 Score: {score}</p>
            <p className="text-xl lg:text-2xl">
              📏 Difficulty: {difficulty.label}
            </p>
          </div>

          <div className="game-btns flex-col justify-items-center">
            <DarkModeBtn />
            <button
              className="lg:hidden mt-4 px-4 py-3 font-semibold rounded-full cursor-pointer transition-all duration-300
              text-white bg-gradient-to-br from-fuchsia-700 to-violet-800
              hover:from-purple-500 hover:to-pink-600 hover:shadow-[0_0_20px_#ff00ff]
               dark:bg-gradient-to-br dark:from-red-500 dark:to-green-300
            dark:hover:from-teal-400 dark:hover:to-cyan-300
              dark:shadow-[0_0_10px_#00ffff] shadow-[0_0_20px_#99004C]"
              onClick={() => window.location.reload()}
            >
              Refresh Game
            </button>
          </div>
        </div>

        <div className="Playing-Area w-full flex flex-col">
          <div
            className="Upper-container border-b-3 dark:border-cyan-400 dark:shadow-amber-300 shadow-lg shadow-slate-700
           mb-5 z-10 w-full flex justify-between items-center flex-wrap gap-3 p-4"
          >
            <div
              className="bg-amber-200 text-black rounded-full px-4 py-2 flex items-center gap-2 
            shadow-[0_0_30px_#A2E4AB] dark:shadow-[0_0_15px_#22d3ee] "
            >
              <BsStopwatch className="text-xl" />
              <p className="text-lg font-semibold">Timer: {time}</p>
            </div>

            <div className="hidden lg:block">
              <button
                className="px-4 py-3 font-semibold rounded-full cursor-pointer transition-all duration-300
              text-white bg-gradient-to-br from-fuchsia-700 to-violet-800
              hover:from-purple-500 hover:to-pink-600 hover:shadow-[0_0_20px_#ff00ff]
               dark:bg-gradient-to-br dark:from-red-500 dark:to-green-300
            dark:hover:from-teal-400 dark:hover:to-cyan-300
              dark:shadow-[0_0_10px_#00ffff] shadow-[0_0_20px_#99004C]"
                onClick={() => window.location.reload()}
              >
                Refresh Game
              </button>
            </div>

            <div>
              <button
                className="px-5 py-3  font-bold rounded-full shadow-lg transition-all duration-300 cursor-pointer
                bg-gradient-to-r from-yellow-950 to-amber-600 text-white border-none
              hover:from-indigo-800 hover:to-green-700 hover:shadow-[0_0_20px_#6c00ff]
                dark:from-cyan-500 dark:to-teal-600
                  dark:hover:from-teal-400 dark:hover:to-cyan-600
                dark:shadow-[0_0_20px_#00ffff]
                 ring-2 ring-white dark:ring-cyan-400 dark:ring-offset-black"
                onClick={() => setExitGameModal(!exitGameModal)}
              >
                End Game
              </button>
            </div>
          </div>

          <div
            className={`Card-area grid ${gridCol} gap-2 sm:gap-3 md:gap-4 p-3 justify-items-center
            ${
              gridSize === 3
                ? "h-[70vh]"
                : gridSize === 4
                ? "h-[70vh]"
                : "max-h-[90vh]"
            }`}
          >
            {cards.map((card) => {
              const isFlipped =
                flippedCards.includes(card.id) ||
                matchedCards.includes(card.id);

              return (
                <div
                  key={card.id}
                  className={`aspect-square w-full rounded-2xl flex justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-105
                    ${
                      gridSize === 3
                        ? "max-w-[130px] sm:max-w-[115px] md:max-w-[120px] lg:max-w-[140px]"
                        : gridSize === 4
                        ? "max-w-[100px] sm:max-w-[95px] md:max-w-[100px] lg:max-w-[115px]"
                        : "max-w-[85px] sm:max-w-[80px] md:max-w-[85px] lg:max-w-[95px]"
                    }`}
                  onClick={() => handleFlip(card)}
                >
                  <img
                    src={
                      card.value === "dummy"
                        ? cardImages["dummy"]
                        : isFlipped
                        ? cardImages[card.value]
                        : CardBack
                    }
                    alt={card.value}
                    className="object-contain h-full w-full p-1"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchRoom;
