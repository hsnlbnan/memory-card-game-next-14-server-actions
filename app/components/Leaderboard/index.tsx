"use client";

import { useEffect, useState } from "react";
import TimerComponent from "../Timer";
import { getScores } from "@/app/actions";

const dummyData = [
  {
    id: 2,
    created_at: "2023-11-03T16:52:03.981Z",
    user_name: "Hüsnü",
    score: 999,
    time: 35500,
  },
  {
    id: 3,
    created_at: "2023-11-03T16:53:33.219Z",
    user_name: "Hüsnü",
    score: 995,
    time: 33400,
  },
  {
    id: 4,
    created_at: "2023-11-03T16:55:41.765Z",
    user_name: "beniyiBiriydim",
    score: 994,
    time: 29200,
  },
  {
    id: 7,
    created_at: "2023-11-03T17:03:20.121Z",
    user_name: "Hüsnü",
    score: 994,
    time: 25300,
  },
  {
    id: 6,
    created_at: "2023-11-03T17:01:57.996Z",
    user_name: "Hüsnü",
    score: 993,
    time: 37000,
  },
  {
    id: 1,
    created_at: "2023-11-03T16:51:40.649Z",
    user_name: "Hüsnü",
    score: 988,
    time: 35500,
  },
  {
    id: 5,
    created_at: "2023-11-03T16:58:39.539Z",
    user_name: "Hüsnü",
    score: 978,
    time: 22300,
  },
];
export default function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState(dummyData);

  // useEffect(() => {
  //   const fetchScores = async () => {
  //     const scores = await getScores();
  //     setLeaderBoard(scores);
  //   };
  //   fetchScores();
  // }, []);

  // console.log(leaderBoard);

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full bg-slate-300">
          <TimerComponent />
        </div>
        {leaderBoard.length > 0 ? (
          <div className="mt-5">
            <div className="w-[200px] p-4 shadow-lg rounded-md mx-auto bg-white">
              <div className="w-20 h-20 bg-gray-50 rounded-full mx-auto flex items-center justify-center text-2xl">
                👑
              </div>
              <div className="text-center text-white mt-4">
                <h1 className="text-lg text-gray-700">Hüsnü</h1>
                <p className="text-sm text-gray-700">999</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </>
  );
}

{
  /* {leaderBoard.map((score) => (
              <li
                key={score.id}
                className="flex flex-row justify-between items-center bg-slate-600"
              >
                <span className="text-white">{score.user_name}</span>
                <span className="text-white">{score.score}</span>
              </li>
            ))} */
}
