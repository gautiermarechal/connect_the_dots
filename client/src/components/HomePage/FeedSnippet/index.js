import React from "react";
import styled from "styled-components";
import Connection from "../../Connection";

const FeedSnippet = ({ type }) => {
  return (
    <>
      <MainContainer>
        {type === "recent" && <Title>Recent Connections</Title>}
        {type === "popular" && <Title>Popular Connections</Title>}
        <FeedContainer>
          <Connection />
          <Connection />
          <Connection />
        </FeedContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 100px;
  padding-right: 100px;
  height: auto;
`;

const FeedContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 25px;
`;

export default FeedSnippet;
