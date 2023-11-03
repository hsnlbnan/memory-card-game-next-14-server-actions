// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { withClick } from "@/app/hoc/WithClickHOC";

const CardComponent = ({
  handleClick,
  id,
  type,
  flipped,
  solved,
  disabled,
  img,
}) => {
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div
      className="perspective"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <motion.div
        className={`relative w-full max-h-[120px] md:max-h-[unset] h-full transform-style preserve-3d rounded-lg overflow-hidden shadow-lg`}
        variants={cardVariants}
        animate={flipped || solved ? "back" : "front"}
        transition={{ duration: 0.6 }}
        onClick={() => (!disabled ? handleClick(id) : null)}
      >
        <div
          className={`absolute w-full h-full backface-hidden flex items-center justify-center  rounded-lg shadow-lg transform rotate-y-0
            ${
              flipped || solved
                ? "pointer-events-none z-10"
                : "pointer-events-auto"
            }
          `}
        >
          <img alt={type} src={img} className="w-full h-full object-contain" />
        </div>

        <div
          className={`absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-lg transform rotate-y-180`}
        >
          <img
            alt="back"
            src="cards/card-back.png"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const Card = withClick(CardComponent);
export default Card;
