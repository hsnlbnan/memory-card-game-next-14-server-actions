// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "..";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useGame } from "@/app/context/GameContext";

export const Game = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const {
    startTime,
    stopTime,
    time,
    setModal,
    setWrongGuesses: setWrongGuesContext,
  } = useGame();
  const [wrongGuesses, setWrongGuesses] = useState(0);
  let point;

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

  const shuffle = (array) => {
    let _array = array.slice(0);
    for (let i = 0; i < array.length - 1; i++) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = _array[i];
      _array[i] = _array[randomIndex];
      _array[randomIndex] = temp;
    }
    return _array;
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
      } else {
        setWrongGuesses((prev) => prev + 1);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards.length]);

  useEffect(() => {
    if (matched.length === cards.length / 2 && matched.length !== 0) {
      stopTime();

      setWrongGuesContext(wrongGuesses);
      setModal(true);
    }
  }, [matched, cards.length]);

  return (
    <div className=" mx-auto h-screen max-w-[970px] w-full">
      <div className="grid grid-cols-4 gap-4 h-full  p-6">
        <AnimatePresence mode="exit">
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Game;
