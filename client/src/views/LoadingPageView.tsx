import styled from 'styled-components'
import cat1 from '../assets/cat_happy_1.png'
import cat2 from '../assets/cat_happy_2.png'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigate } from 'react-router'

interface PropTypes {
  isError?: boolean
}

function LoadingPageView({ isError }: PropTypes) {
  const [shownImg, setShownImg] = useState(true)
  useEffect(() => {
    if (!isError) {
      const timer = setInterval(() => {
        setShownImg((prev) => !prev)
      }, 500)
      return () => clearInterval(timer)
    }
  }, [shownImg, isError])

  if (isError) return <Navigate to="/login" replace />
  return (
    <Wrapper>
      <Content>
        <Headline>Loading ...</Headline>
        <AnimContainer>
          <MyPet
            key="cat1"
            src={cat1}
            alt="loading image 1"
            animate={{ opacity: shownImg ? 1 : 0 }}
            transition={{ duration: 0 }}
          />
          <MyPet
            key="cat2"
            src={cat2}
            alt="loading image 1"
            animate={{ opacity: shownImg ? 0 : 1 }}
            transition={{ duration: 0 }}
          />
        </AnimContainer>
        <AffirmationCard>
          Get food by completing 2 ToDos / write journal and don't forget to
          feed your pet
        </AffirmationCard>
      </Content>
    </Wrapper>
  )
}

export default LoadingPageView

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f4f1df 0%, #cddcd8 100%);
  padding: 16px;
`

const Headline = styled.h1`
  font-size: clamp(28px, 5vw, 48px);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
`

const AnimContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MyPet = styled(motion.img)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: contain;
`
const AffirmationCard = styled.div`
  text-align: center;
  width: 100%;
  max-width: 400px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.light_grey};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`
