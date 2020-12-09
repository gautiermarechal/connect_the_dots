import React from "react";
import styled from "styled-components";

const LinksContainerComponent = ({ postConnection }) => {
  return (
    <>
      <LinksContainer>
        <Title>Links</Title>
      </LinksContainer>
    </>
  );
};

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1``;

export default LinksContainerComponent;
