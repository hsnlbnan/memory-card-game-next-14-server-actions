// GameContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

type GameContextType = {
  time: number;
  startTime: () => void;
  stopTime: () => void;
  resetTimer: () => void;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTime = () => setIsRunning(true);
  const stopTime = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <GameContext.Provider value={{ time, startTime, stopTime, resetTimer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
