import styled from "styled-components";
import cat_happy_1 from "../assets/cat_happy_1.png";
import cat_happy_2 from "../assets/cat_happy_2.png";
import cat_normal_1 from "../assets/cat_normal_1.png";
import cat_normal_2 from "../assets/cat_normal_2.png";
import cat_sleepy_1 from "../assets/cat_sleepy_1.png";
import cat_sleepy_2 from "../assets/cat_sleepy_2.png";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";

export const PetContainer = styled.div`
  width: 120px;
  height: 120px;
  overflow: visible;
  position: relative;
  z-index: 1000;
`;

const AnimPet = styled(motion.img)<{ $filter?: string }>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: ${(props) => props.$filter || "none"};

  &:active {
    transform: translate(-5px, -5px);
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface PetFilter {
  red: string;
  pink: string;
  green: string;
}

const petFilter: PetFilter = {
  red: `invert(19%) sepia(37%) saturate(6758%) hue-rotate(352deg) brightness(87%) contrast(102%);`,
  pink: `invert(92%) sepia(39%) saturate(3963%) hue-rotate(276deg) brightness(89%) contrast(109%);`,
  green: `invert(93%) sepia(19%) saturate(5409%) hue-rotate(120deg) brightness(87%) contrast(87%);`,
};

const imageAnimations = {
  happy: { transition: { duration: 0, repeat: Infinity } },
  normal: { transition: { duration: 0, repeat: Infinity } },
  sleepy: { transition: { duration: 0, repeat: Infinity } },
};

interface PropTypes {
  health?: number;
  color?: keyof PetFilter;
  alt?: string;
}
export function MyPet({ health, color }: PropTypes) {
  const [shownImg, setShownImg] = useState(true);
  const [animType, setAnimType] = useState<"happy" | "normal" | "sleepy">(
    "normal"
  );
  const animImgGroups = {
    happy: [cat_happy_1, cat_happy_2],
    normal: [cat_normal_1, cat_normal_2],
    sleepy: [cat_sleepy_1, cat_sleepy_2],
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setShownImg((prev) => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (health !== undefined) {
      if (health >= 75) setAnimType("happy");
      else if (health < 25) setAnimType("sleepy");
      else setAnimType("normal");
    }
  }, [health]);

  const currentImgGroup = animImgGroups[animType];
  const filter = color ? petFilter[color] : "none";

  return (
    <>
      <AnimPet
        $filter={filter}
        key={currentImgGroup[0]}
        src={currentImgGroup[0]}
        alt="loading image 1"
        animate={{ ...imageAnimations[animType], opacity: shownImg ? 1 : 0 }}
      />
      <AnimPet
        $filter={filter}
        key={currentImgGroup[1]}
        src={currentImgGroup[1]}
        alt="loading image 2"
        animate={{ ...imageAnimations[animType], opacity: shownImg ? 0 : 1 }}
      />
    </>
  );
}
