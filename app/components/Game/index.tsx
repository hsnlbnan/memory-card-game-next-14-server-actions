// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "..";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useGame } from "@/app/context/GameContext";
import { shuffle } from "@/app/utils";

export const Game = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [btnHover, setBtnHover] = useState(false);

  const [gameEnd, setGameEnd] = useState(false);

  const {
    startTime,
    stopTime,
    setModal,
    setWrongGuesses: setWrongGuesContext,
  } = useGame();
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    if (flipped.length === 1) {
      startTime();
    }
  }, [flipped]);

  const handleClick = (id) => {
    if (!flipped.includes(id) && flipped.length < 2) {
      setFlipped((prev) => [...prev, id]);
    }
  };

  const initializeDeck = () => {
    let id = 0;
    const cards = ["1", "2", "3", "4", "5", "6"].reduce((acc, type) => {
      acc.push({
        id: id++,
        type,
        img: `./cards/${type}.png`,
      });
      acc.push({
        id: id++,
        type,
        img: `./cards/${type}.png`,
      });
      return acc;
    }, []);
    return shuffle(cards);
  };

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstCard, secondCard] = flipped;
      if (cards[firstCard].type === cards[secondCard].type) {
        setMatched((prev) => [...prev, cards[firstCard].type]);
        setFlipped([]);
      } else {
        setWrongGuesses((prev) => prev + 1);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped, cards.length]);

  useEffect(() => {
    if (matched.length === cards.length / 2 && matched.length !== 0) {
      stopTime();
      setWrongGuesContext(wrongGuesses);
      setModal(true);
      setGameEnd(true);
    }
  }, [matched, cards.length]);

  // useEffect(() => {
  //   if (gameEnd) {
  //     setCards(initializeDeck());
  //     setFlipped([]);
  //     setMatched([]);
  //     setWrongGuesses(0);
  //   } else {
  //     setGameEnd(false);
  //   }
  // }, [gameEnd]);

  function handleRestart() {
    setCards(initializeDeck());
    setFlipped([]);
    setMatched([]);
    setWrongGuesses(0);
    setGameEnd(false);
  }

  function buttonHandler() {
    setEndGame(true);
    handleRestart();
  }

  return (
    <div className="mx-auto h-[120vh] md:h-screen max-w-[970px] w-full relative">
      <AnimatePresence mode="exit">
        <motion.div
          className="grid grid-cols-3 md:grid-cols-4 gap-4 h-full  p-6"
          key={"cards"}
        >
          {cards.map((card, index) => (
            <Card
              key={`${card.id}-${index}`}
              id={index}
              type={card.type}
              flipped={flipped.includes(index) || matched.includes(card.type)}
              handleClick={handleClick}
              img={card.img}
            />
          ))}
        </motion.div>
        {gameEnd && (
          <motion.div
            key={"modal"}
            initial={{ opacity: 0, y: 0, x: "-50%" }}
            animate={{ opacity: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, y: 0, x: "-50%", transition: { delay: 1.5 } }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              stiffness: 100,
              type: "spring",
            }}
            className="h-full w-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-black bg-opacity-75 rounded-2xl shadow-lg
          "
          >
            <motion.button
              className="
               inset-0 z-10 bg-[#4E42A9] rounded-2xl px-4 py-3 text-white font-semibold text-lg 
               flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all
                "
              onClick={buttonHandler}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <RefreshIcon className="w-4 h-4 text-white" hover={btnHover} />
              Yeniden başla
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RefreshIcon = (props) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={24}
      height={24}
      viewBox="0 0 489.645 489.645"
      fill={props.hover ? "#fff" : "#fff"}
      animate={props.hover ? { rotate: 360 } : {}}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        stiffness: 100,
        type: "spring",
      }}
      {...props}
    >
      <path d="M460.656 132.911c-58.7-122.1-212.2-166.5-331.8-104.1-9.4 5.2-13.5 16.6-8.3 27 5.2 9.4 16.6 13.5 27 8.3 99.9-52 227.4-14.9 276.7 86.3 65.4 134.3-19 236.7-87.4 274.6-93.1 51.7-211.2 17.4-267.6-70.7l69.3 14.5c10.4 2.1 21.8-4.2 23.9-15.6 2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25 16.6-23.9 22.9l15.6 123.8c1 10.4 9.4 17.7 19.8 17.7 12.8 0 20.8-12.5 19.8-23.9l-6-50.5c57.4 70.8 170.3 131.2 307.4 68.2 58.1-30 191.5-147.7 103.9-329.6z" />
    </motion.svg>
  );
};

export default Game;
