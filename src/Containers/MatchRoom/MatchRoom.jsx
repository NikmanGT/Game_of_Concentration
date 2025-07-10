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
  const userName = localStorage.getItem("username");

  const difficulty = JSON.parse(localStorage.getItem("difficulty"));
  const gridSize = difficulty.value;
  const totalSlots = gridSize * gridSize;

  let navigate = useNavigate();

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
      className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] 
      dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_70%)] overflow-hidden"
    >
      <div className="main-matchroom-container flex lg:flex-row flex-col h-full">
        <div className="stats-container lg:w-1/4 flex flex-row lg:flex-col justify-between p-4">
          <div className="text-container p-3 space-y-1 text-black dark:text-amber-300">
            <p className="text-xl lg:text-2xl break-words">
              UserName: {userName}
            </p>
            <p className="text-xl lg:text-2xl">Moves: {moves}</p>
            <p className="text-xl lg:text-2xl">Score: {score}</p>
            <p className="text-xl lg:text-2xl">
              Difficulty: {difficulty.label}
            </p>
          </div>

          <div className="game-btns">
            <DarkModeBtn />
            <button
              className="mt-4 px-4 py-2 bg-amber-300 text-black rounded shadow cursor-pointer lg:hidden"
              onClick={() => window.location.reload()}
            >
              Refresh Game
            </button>
          </div>
        </div>

        <div className="Playing-Area w-full flex flex-col">
          <div className="Upper-container w-full flex justify-between items-center flex-wrap gap-3 p-4">
            <div className="bg-amber-200 text-black rounded-full px-4 py-2 flex items-center gap-2">
              <BsStopwatch className="text-xl" />
              <p className="text-lg">Timer: {time}</p>
            </div>

            <div className="hidden lg:block">
              <button
                className="px-4 py-2 bg-amber-300 text-black rounded shadow cursor-pointer"
                onClick={() => window.location.reload()}
              >
                Refresh Game
              </button>
            </div>

            <div>
              <button
                className="px-4 py-2 border text-white cursor-pointer"
                onClick={() => navigate("/")}
              >
                End Game
              </button>
            </div>
          </div>

          <div
            className={`Card-area grid ${gridCol} gap-2 sm:gap-3 md:gap-4 p-3 justify-items-center
            ${
              gridSize === 3
                ? "h-[450px]"
                : gridSize === 4
                ? "h-[500px]"
                : "grow"
            }`}
          >
            {cards.map((card) => {
              const isFlipped =
                flippedCards.includes(card.id) ||
                matchedCards.includes(card.id);

              return (
                <div
                  key={card.id}
                  className="aspect-square w-full max-w-[120px] sm:max-w-[95px] md:max-w-[110px] lg:max-w-[140px] 
                  xl:max-w-[150px] rounded flex justify-center items-center"
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
