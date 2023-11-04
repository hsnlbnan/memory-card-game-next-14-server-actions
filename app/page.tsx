"use client";
import { Game } from "./components";
import { GameProvider } from "./context/GameContext";
import TimerComponent from "./components/Timer";
import LeaderBoard from "./components/Leaderboard";
import Modal from "./components/Modal";
import { Toaster } from "sonner";

export default function Page() {
  return (
    <GameProvider>
      <main className="flex items-center justify-center h-unset flex-col md:flex-row md:h-screen">
        <div className="w-full bg-gradient-to-r from-[#6B5AE0] to-[#4E42A9] flex flex-col items-center justify-center h-[100vh] md:w-3/4 md:h-[unset]">
          <Game />
        </div>
        <div className="w-full md:w-1/4 md:h-screen shadow-[0 0 20px 10px #0000005c]">
          <LeaderBoard />
        </div>
      </main>
      <Toaster position="bottom-right" />
      <Modal />
    </GameProvider>
  );
}
