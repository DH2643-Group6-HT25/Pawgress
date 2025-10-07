import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cat1 from "../assets/cat_normal_1.png";
import cat2 from "../assets/cat_normal_2.png";
import styled from "styled-components";
import { MyCard } from "../components/CardComponents";

export default function SuspenseView() {
  const [shownImg, setShownImg] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setShownImg((prev) => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);
  return (
    <MyCard>
      <SuspenseViewContainer>
        <AnimatePresence mode="wait">
          {shownImg ? (
            <SuspenseViewImg
              key="cat1"
              src={cat1}
              alt="loading image 1"
              transition={{ duration: 0.25 }}
            />
          ) : (
            <SuspenseViewImg
              key="cat2"
              src={cat2}
              alt="loading image 1"
              transition={{ duration: 0.25 }}
            />
          )}
        </AnimatePresence>
      </SuspenseViewContainer>
    </MyCard>
  );
}

const SuspenseViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SuspenseViewImg = styled(motion.img)`
  width: 40%;
  height: auto;
  object-fit: contain;
`;
