import React, { useEffect } from "react";
import TimerComponent from "../Timer";

export const LeaderBoard = async () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full bg-slate-300">
          <TimerComponent />
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
