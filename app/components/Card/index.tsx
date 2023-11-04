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

  const delayChildren = {
    front: { delayChildren: 0.4 },
    back: { delayChildren: 0.4 },
  };

  return (
    <motion.div
      className="perspective overflow-hidden rounded-lg shadow-lg"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.8,
        delayChildren: 0.4,
      }}
    >
      <motion.div
        className={`relative w-full max-h-[120px] md:max-h-[unset] h-full transform-style preserve-3d rounded-lg overflow-hidden shadow-lg`}
        variants={[cardVariants, delayChildren]}
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
    </motion.div>
  );
};

export const Card = withClick(CardComponent);
export default Card;
