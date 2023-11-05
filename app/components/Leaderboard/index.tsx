"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import TimerComponent from "../Timer";
import { getScores, getDailyScores } from "@/app/actions";

let tabs = [
  { id: "weekly", label: "Günlük" },
  { id: "all-time", label: "Tüm Zamanlar" },
];

const Circle = ({ text }) => {
  return (
    <div className="w-16 h-16 bg-[#FFD6DD] rounded-full mx-auto flex items-center justify-center text-2xl">
      {text}
    </div>
  );
};

const LeaderBoardItem = ({ rank, name, score }) => {
  return (
    <motion.div className="py-6 px-4 bg-white rounded-[20px] shadow-lg flex gap-4 items-center">
      <div className="text-xs font-semibold text-[#A1A1AD] py-1 px-2 border border-[#E6E6E6] p-6 rounded-full">
        {rank}
      </div>
      <div className="flex gap-2 flex-col">
        <div className="text-black text-[20px] font-bold">{name}</div>
        <div className="text-[#858494] font-regular text-[14px]">
          {score} Puan
        </div>
      </div>
    </motion.div>
  );
};

const Circles = () => {
  // infinite animation to circles width and height

  function template({ rotate, scale }) {
    return `scale(${scale}) translateX(${"-50%"})`;
  }

  return (
    <>
      <motion.div className="w-[300px] h-[300px] bg-[#796BE3] rounded-full absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 z-[1] pointer-events-none"></motion.div>
      <motion.div
        transformTemplate={template}
        animate={{
          rotate: [0, 0],
          scale: [1, 2, 1],
          origin: [0.5, 0.5, 0.5],
          left: ["50%", "80%", "50%"],
          transition: {
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.6, 0.8],
            repeat: Infinity,
            repeatDelay: 2.4,
          },
        }}
        className="w-[440px] h-[440px] border border-[#796BE3] rounded-full absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 z-[1] pointer-events-none"
      ></motion.div>
      <motion.div
        transformTemplate={template}
        animate={{
          rotate: [0, 0],
          scale: [1, 2, 1],
          origin: [0.5, 0.5, 0.5],
          left: ["50%", "80%", "50%"],
          transition: {
            duration: 1.6,
            ease: "easeInOut",
            times: [0, 0.9, 1.5],
            repeat: Infinity,
            repeatDelay: 1.8,
          },
        }}
        className="w-[640px] h-[640px] border border-[#796BE3] rounded-full absolute bottom-[-200px] left-1/2 transform -translate-x-1/2 z-[1] pointer-events-none"
      ></motion.div>
      <motion.div
        transformTemplate={template}
        animate={{
          rotate: [0, 0],
          scale: [1, 2, 1],
          origin: [0.5, 0.5, 0.5],
          left: ["50%", "80%", "50%"],
          transition: {
            duration: 2.4,
            ease: "easeInOut",
            times: [0, 1.2, 1.8],
            repeat: Infinity,
            repeatDelay: 2.4,
          },
        }}
        className="w-[840px] h-[840px] border border-[#796BE3] rounded-full absolute bottom-[-300px] left-1/2 transform -translate-x-1/2 z-[1] pointer-events-none"
      ></motion.div>
    </>
  );
};

export default function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    if (activeTab === "weekly") {
      const fetchScores = async () => {
        const scores = await getDailyScores();
        Array.isArray(scores) ? setLeaderBoard(scores) : setLeaderBoard([]);
      };

      fetchScores();
    } else {
      const fetchScores = async () => {
        const scores = await getScores();
        Array.isArray(scores) ? setLeaderBoard(scores) : setLeaderBoard([]);
      };

      fetchScores();
    }
  }, [activeTab]);

  return (
    <>
      <AnimatePresence mode="wait">
        <div className="flex flex-col h-full bg-[#6A5AE0]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0.2,
              delayChildren: 0.2,
              delay: 0.5,
            }}
            className="w-full mt-5"
          >
            <TimerComponent />
          </motion.div>
          <Suspense fallback={<div>Loading...</div>} />
          {leaderBoard?.length > 0 && (
            <div className="mt-5 h-full relative overflow-y-scroll">
              <motion.h3
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.2,
                  delayChildren: 0.2,
                  delay: 0.6,
                }}
                className="text-center text-white text-2xl font-semibold my-5 relative z-20"
              >
                Leaderboard
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.2,
                  delayChildren: 0.2,
                  delay: 0.8,
                }}
                className="flex space-x-1 bg-[#4E42A9] rounded-3xl p-2 shadow-lg  mx-auto w-[80%] justify-between z-20 relative"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id ? "" : "hover:text-white/60"
                    } w-1/2 relative rounded-3xl px-3 py-3 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 z-10`}
                    style={{
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="bubble"
                        className="absolute inset-0 z-10 bg-[#9087E5] rounded-2xl "
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </motion.div>
              <div className="flex items-end mt-5 justify-center relative z-10 ">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{
                    duration: 2,
                    type: "spring",
                    bounce: 0.2,
                    delay: 2.2,
                  }}
                  className="flex items-center justify-center gap-2 flex-col z-10"
                >
                  <Circle text="🎉" />
                  <h4 className="text-center text-white text-sm font-semibold mt-2">
                    {leaderBoard?.[1]?.user_name}
                  </h4>
                  <div className="px-3 py-2 bg-[#9087E5] text-white rounded-md inline-flex items-center justify-center">
                    {leaderBoard?.[1]?.score} Puan
                  </div>

                  <div className="relative mt-3">
                    <svg
                      width="104"
                      height="126"
                      viewBox="0 0 104 126"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="-0.5"
                        y="0.5"
                        width="103"
                        height="110"
                        transform="matrix(-1 0 0 1 103 15)"
                        fill="#9087E5"
                        stroke="#9087E5"
                      />
                      <path d="M13 0H104V15H0L13 0Z" fill="#CDC9F3" />
                    </svg>

                    <h4
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                   text-white text-[80px] font-semibold"
                    >
                      2
                    </h4>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{
                    duration: 2,
                    type: "spring",
                    bounce: 0.2,
                    delay: 3,
                  }}
                  className="flex items-center justify-center gap-2 flex-col z-10"
                >
                  <Circle text="👑" />
                  <h4 className="text-center text-white text-sm font-semibold mt-2">
                    {leaderBoard?.[0]?.user_name}
                  </h4>
                  <div className="px-3 py-2 bg-[#9087E5] text-white rounded-md inline-flex items-center justify-center">
                    {leaderBoard?.[0]?.score} Puan
                  </div>
                  {/* height 0 to 100% anim */}
                  <motion.div className="relative mt-3">
                    <motion.svg
                      width="112"
                      height="158"
                      viewBox="0 0 112 158"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="16"
                        width="110"
                        height="142"
                        fill="url(#paint0_linear_1_2)"
                      />
                      <path d="M17 0H94L112 16H0L17 0Z" fill="#CDC9F3" />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1_2"
                          x1="55"
                          y1="16"
                          x2="55"
                          y2="158"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#9188E5" />
                          <stop offset="1" stopColor="#C1BCF0" />
                        </linearGradient>
                      </defs>
                    </motion.svg>

                    <h4
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                   text-white text-[100px] font-semibold"
                    >
                      1
                    </h4>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{
                    duration: 2,
                    type: "spring",
                    bounce: 0.2,
                    delay: 1.6,
                  }}
                  className="flex items-center justify-center gap-2 flex-col ml-[-3px] z-10"
                >
                  <Circle text="🥳" />
                  <h4 className="text-center text-white text-sm font-semibold mt-2">
                    {leaderBoard?.[2]?.user_name}
                  </h4>
                  <div className="px-3 py-2 bg-[#9087E5] text-white rounded-md inline-flex items-center justify-center">
                    {leaderBoard?.[2]?.score} Puan
                  </div>

                  <div className="relative mt-3">
                    <svg
                      width="105"
                      height="94"
                      viewBox="0 0 105 94"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="104"
                        height="79"
                        transform="matrix(-1 0 0 1 105 15)"
                        fill="#9087E5"
                      />
                      <path d="M88.5 0H0V15.5H104L88.5 0Z" fill="#CDC9F3" />
                    </svg>

                    <h4
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2
                   text-white text-[60px] font-semibold"
                    >
                      3
                    </h4>
                  </div>
                </motion.div>

                <Circles />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  bounce: 0.2,
                  delayChildren: 0.2,
                  delay: 1.2,
                }}
                className="bg-[#EFEEFC] w-full relative z-10 max-w-[93.2%] mx-auto p-5 gap-5 flex flex-col"
              >
                {leaderBoard
                  ?.slice(3)
                  .map((item, index) => (
                    <LeaderBoardItem
                      key={item.id}
                      rank={index + 4}
                      name={item.user_name}
                      score={item.score}
                    />
                  ))}
              </motion.div>
            </div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
}
