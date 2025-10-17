import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import cat1 from '../assets/cat_normal_1.png'
import cat2 from '../assets/cat_normal_2.png'
import styled from 'styled-components'
import { MyCard } from '../components/CardComponents'

interface SuspenseViewProps {
  modelName: string
}

export default function SuspenseView({
  modelName,
}: Readonly<SuspenseViewProps>) {
  const [shownImg, setShownImg] = useState(true)
  useEffect(() => {
    const timer = setInterval(() => {
      setShownImg((prev) => !prev)
    }, 500)
    return () => clearInterval(timer)
  }, [])
  return (
    <MyCard>
      <SuspenseViewContainer>
        <SuspenseText> {modelName} is loading...</SuspenseText>
        <SuspenseViewImg
          key="cat1"
          src={cat1}
          alt="loading image 1"
          animate={{ opacity: shownImg ? 1 : 0 }}
          transition={{ duration: 0 }}
        />
        <SuspenseViewImg
          key="cat2"
          src={cat2}
          alt="loading image 1"
          animate={{ opacity: shownImg ? 0 : 1 }}
          transition={{ duration: 0 }}
        />
      </SuspenseViewContainer>
    </MyCard>
  )
}

const SuspenseViewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SuspenseViewImg = styled(motion.img)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /*Prevent images from being stretched*/
  width: auto;
  height: auto;
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
`
const SuspenseText = styled.p`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: ${(props) => props.theme.fonts.pixel};
  text-transform: lowercase;
  font-size: 1.4rem;
  word-break: break-word;
  width: max-content;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`
