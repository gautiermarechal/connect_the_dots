import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { GiBlackBook } from "react-icons/gi";
import FeedSnippet from "./FeedSnippet";
import { useSpring, animated } from "react-spring";

const HomePage = () => {
  const animation1 = useSpring({
    config: { duration: 1000, velocity: 1000 },
    delay: 250,

    opacity: 1,
    from: { opacity: 0 },
  });
  const animation2 = useSpring({
    width: 300,
    delay: 500,
    from: { width: 0 },
  });

  const animation3 = useSpring({
    width: 300,
    delay: 1000,
    from: { width: 0 },
  });
  const animation4 = useSpring({
    config: { duration: 1000, velocity: 1000 },
    opacity: 1,
    delay: 250,

    from: { opacity: 0 },
  });

  const animationText = useSpring({
    config: { duration: 1000, velocity: 1000 },
    opacity: 1,
    delay: 2000,
    from: { opacity: 0 },
  });
  return (
    <>
      <MainContainer>
        <InfoContainer>
          <animated.div style={animation1}>
            <BookIcon />
          </animated.div>
          <Line style={animation2} />
          <animated.div style={animationText}>
            <InfoTitle>
              Connect any concepts from a book with any concepts from another
              book.
            </InfoTitle>
          </animated.div>
          <Line style={animation3} />
          <animated.div style={animation4}>
            <BookIcon />
          </animated.div>
        </InfoContainer>
        {/* <FeedSnippet type="recent" /> */}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 100px;
  align-items: center;
  height: 90vh;
  background-color: ${COLORS.white};
`;

const BookIcon = styled(GiBlackBook)`
  height: 200px;
  width: 200px;
`;

const Line = styled(animated.hr)`
  width: 300px;
  border: 0;
  border-top: 5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 5px solid rgba(255, 255, 255, 0.3);
`;

const InfoTitle = styled.h1`
  text-align: center;
  font-weight: 100;
  width: 400px;
`;

export default HomePage;
