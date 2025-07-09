import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import CardBack from "../../assets/Card_back.svg";
import DarkModeBtn from "../../Components/DarkModebtn";
import { BsStopwatch } from "react-icons/bs";
import Card1 from "../../assets/Heart_01.svg";
import Card2 from "../../assets/Heart_02.svg";
import Card3 from "../../assets/Heart_03.svg";
import Card4 from "../../assets/Heart_04.svg";
import Card5 from "../../assets/Heart_05.svg";

const MatchRoom = () => {
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
    if (matchedCards.length == 8) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        return alert(
          `Finishing a Simple Card Game in almost ${time}s, get better, anyways congrats`
        );
      }, 800);
      localStorage.setItem(userName, score);
    }
  }, [matchedCards]);

  const cardImages = {
    "Card 1": Card1,
    "Card 2": Card2,
    "Card 3": Card3,
    "Card 4": Card4,
    "Card 5": Card5,
  };
  const generateCards = () => {
    const BaseArr = Array.from({ length: 4 }, (_, i) => i + 1);
    const DuplicateArr = [...BaseArr, ...BaseArr];
    DuplicateArr.push(5);
    const ShuffledArr = DuplicateArr.sort(() => Math.random() - 0.5);

    return ShuffledArr.map((val, index) => ({
      id: index,
      value: `Card ${val}`,
    }));
  };
  const [cards] = useState(generateCards);

  const handleFlip = (card) => {
    if (flippedCards.includes(card.id) || matchedCards.includes(card.id))
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

  let navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const difficulty = JSON.parse(localStorage.getItem("difficulty"));
  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] 
    dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_70%)] text-white overflow-hidden"
    >
      <div className="main-matchroom-container flex lg:flex-row flex-col h-full">
        <div className="stats-container border-2 p-7 px-20 lg:w-1/4 flex lg:flex-col justify-between lg:justify-center text-amber-950 dark:text-amber-100">
          <div className="text-container border-2 lg:p-10">
            <p>UserName: {userName}</p>
            <p>Moves: {moves}</p>
            <p>Score: {score}</p>
            <p>Difficulty: {difficulty.label}</p>
          </div>
          <div className="dark-mode-button lg:text-center">
            <DarkModeBtn />
          </div>
        </div>

        <div className="Playing-Area border-2 w-full">
          <div className="Upper-container w-full border-1 flex justify-between p-4">
            <div
              className="Stopwatch-container lg:w-1/3 sm:w-2/5 bg-amber-200 rounded-full
             text-black flex justify-center gap-4 p-2"
            >
              {<BsStopwatch className="text-4xl" />}
              <p className="border-1 text-2xl">Timer: {time}</p>
            </div>
            <div className="Close-btn">
              <button
                className="cursor-pointer border-2 p-4 text-black dark:text-white"
                onClick={() => {
                  navigate("/");
                }}
              >
                End game
              </button>
            </div>
          </div>
          <div className="Card-area border-1 grid-cols-3 grid">
            {cards.map((card) => {
              const isFlipped =
                flippedCards.includes(card.id) ||
                matchedCards.includes(card.id);
              return (
                <div
                  key={card.id}
                  className="p-5 flex justify-center"
                  onClick={() => {
                    handleFlip(card);
                  }}
                >
                  <img
                    className="lg:h-45 h-30 md:h-34"
                    src={isFlipped ? cardImages[card.value] : CardBack}
                    alt={card.value}
                  ></img>
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
