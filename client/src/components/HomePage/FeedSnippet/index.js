import React from "react";
import styled from "styled-components";
import Connection from "../../Connection";

const FeedSnippet = () => {
  return (
    <>
      <MainContainer>
        <Connection />
        <Connection />
        <Connection />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-left: 100px;
  padding-right: 100px;
  height: 500px;
`;

export default FeedSnippet;
