import { useGame } from "@/app/context/GameContext";
import React from "react";

const TimerComponent: React.FC = () => {
  const { time } = useGame();

  const formatTime = (time: any) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds)
      .padStart(3, "0")
      .substring(0, 2);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  return (
    <div className="flex items-center justify-center h-16 text-4xl font-mono text-white">
      {formatTime(time)}
    </div>
  );
};

export default TimerComponent;
