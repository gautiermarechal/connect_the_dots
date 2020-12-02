import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { GiBlackBook } from "react-icons/gi";
import FeedSnippet from "./FeedSnippet";

const HomePage = () => {
  return (
    <>
      <MainContainer>
        <InfoContainer>
          <BookIcon />
          <Line />
          <InfoTitle>
            Connect any concepts from a book with any concepts from another
            book.
          </InfoTitle>
          <Line />
          <BookIcon />
        </InfoContainer>
        <FeedSnippet type="recent" />
        <FeedSnippet type="popular" />
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
  height: 250px;
  background-color: ${COLORS.lightGreen};
`;

const BookIcon = styled(GiBlackBook)`
  height: 200px;
  width: 200px;
`;

const Line = styled.hr`
  width: 300px;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const InfoTitle = styled.h3`
  text-align: center;
  font-weight: 100;
  width: 400px;
`;

export default HomePage;
