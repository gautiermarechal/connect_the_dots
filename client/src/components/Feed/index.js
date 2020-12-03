import React from "react";
import styled from "styled-components";
import Connection from "../Connection/index";

const Feed = ({ type }) => {
  return (
    <>
      <Wrapper>
        <Title>{type}</Title>
        <Line />
        <MainContainer>
          <Connection />
          <Connection />
          <Connection />
          <Connection />
          <Connection />
          <Connection />
          <Connection />
          <Connection />
          <Connection />
        </MainContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
`;

const Title = styled.h2``;

const Line = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export default Feed;
