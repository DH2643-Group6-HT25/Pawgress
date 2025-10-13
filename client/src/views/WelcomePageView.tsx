import { Link } from "react-router";
import styled from "styled-components";

import { MyButton } from "../components/MyButton";

// 🔽 import your pixel icons (replace paths)
import cat from "../assets/cat_happy_2.png";
import heart from "../assets/heart_5.png";
import fish from "../assets/fish.png";
import poop from "../assets/poop.png";

const sizes = {
  cat: "clamp(48px, 8vw, 120px)", // smaller
  poop: "clamp(40px, 6vw, 90px)", // smaller
  fish: "clamp(64px, 10vw, 160px)", // bigger, matches heart/visual weight
  heart: "clamp(52px, 8vw, 120px)", // unchanged, still ~same as fish now
};

type DecoItem = {
  src: string;
  xPct: number; // left %
  yPct: number; // top %
  size?: string; // css size (use clamp)
  rotate?: number;
  flipX?: boolean;
};

const decorations: DecoItem[] = [
  { src: cat, xPct: 7, yPct: 10, size: sizes.cat },
  { src: heart, xPct: 28, yPct: 12, size: sizes.heart },
  { src: fish, xPct: 59, yPct: 12, size: sizes.fish },
  { src: heart, xPct: 87, yPct: 18, size: sizes.heart },
  { src: poop, xPct: 46, yPct: 22, size: sizes.poop },
  { src: heart, xPct: 8, yPct: 43, size: sizes.heart },
  { src: fish, xPct: 9, yPct: 69, size: sizes.fish, flipX: true },
  { src: heart, xPct: 26, yPct: 72, size: sizes.heart },
  { src: poop, xPct: 8, yPct: 84, size: sizes.poop },
  { src: fish, xPct: 46, yPct: 83, size: sizes.fish },
  { src: poop, xPct: 71, yPct: 82, size: sizes.poop },
  { src: heart, xPct: 81, yPct: 66, size: sizes.heart },
  { src: cat, xPct: 90, yPct: 85, size: sizes.cat },
];

function WelcomePage() {
  return (
    <Wrapper>
      <Header>PAWGRESS</Header>

      {/* Decorative icons */}
      {decorations.map((d, i) => (
        <Deco
          key={i}
          src={d.src}
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="lazy"
          style={{
            left: `${d.xPct}%`,
            top: `${d.yPct}%`,
            width: d.size ?? "clamp(32px, 5vw, 64px)",
            transform: `translate(-50%, -50%) rotate(${d.rotate ?? 0}deg) scaleX(${d.flipX ? -1 : 1})`,
          }}
        />
      ))}
      <Content>
        <Headline>Stay PRRductive by taking care of your pixel pet!</Headline>

        <SubHeadline>
          Turn your to-do list and journaling into a playful self-care journey.
        </SubHeadline>

        <ButtonRow>
          {/* Use Links so routing works */}
          <MyButton primary as={Link} to="/signup">
            Sign Up
          </MyButton>
          <MyButton primary as={Link} to="/login">
            Log In
          </MyButton>
        </ButtonRow>
      </Content>

      <div>
        <MyButton primary as={Link} to="/dashboard">
          Dashboard
        </MyButton>
        <MyButton primary as={Link} to="/loading">
          Loading Page
        </MyButton>
        <MyButton primary as={Link} to="/onsuspense">
          Suspense View
        </MyButton>
      </div>
    </Wrapper>
  );
}

export default WelcomePage;

/* ---------- styles ---------- */
const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f4f1df 0%, #cddcd8 100%);
`;

const Content = styled.div`
  text-align: center;
  max-width: 820px;
  padding: 0 24px;
  z-index: 1;
`;

const Headline = styled.h1`
  font-size: 48px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
`;

const SubHeadline = styled.p`
  font-size: 20px;
  line-height: 1.5;
  opacity: 0.85;
  margin: 0 0 28px 0;
`;

const ButtonRow = styled.div`
  display: inline-flex;
  gap: 12px;
`;

const BaseBtn = styled.button`
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
`;

const Primary = styled(BaseBtn)`
  background: #111;
  color: #fff;
`;

const Secondary = styled(BaseBtn)`
  background: #444;
  color: #fff;
  opacity: 0.95;
`;

const Deco = styled.img`
  position: absolute;
  pointer-events: none;
`;

const Header = styled.div`
  position: absolute;
  top: 24px;
  right: 32px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.08em;
`;
