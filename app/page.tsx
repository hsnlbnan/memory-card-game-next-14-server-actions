"use client";
import { Game } from "./components";
import { GameProvider } from "./context/GameContext";
import TimerComponent from "./components/Timer";
import LeaderBoard from "./components/Leaderboard";
import Modal from "./components/Modal";

export default function Page() {
  return (
    <GameProvider>
      <main className="flex items-center justify-center h-screen">
        <div className="w-3/4 border-gray-400">
          <Game />
        </div>
        <div className="w-1/4 h-screen">
          <LeaderBoard />
        </div>
      </main>

      <Modal />
    </GameProvider>
  );
}
