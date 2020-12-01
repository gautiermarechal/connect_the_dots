import React from "react";
import styled from "styled-components";
import Connection from "../../Connection";

const FeedSnippet = () => {
  return (
    <>
      <MainContainer>
        <Connection />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
`;

export default FeedSnippet;
