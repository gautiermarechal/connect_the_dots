import React from "react";
import styled from "styled-components";

import Link from "./Link";

const LinksContainerComponent = ({ postConnection }) => {
  return (
    <>
      <LinksContainer>
        <Title>Links</Title>
        {postConnection.post_connection.content.map((contentObj) => {
          return contentObj.concepts.map((concept) => {
            return <Link concept={concept} />;
          });
        })}
      </LinksContainer>
    </>
  );
};

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-items: center;
`;

const Title = styled.h1``;

export default LinksContainerComponent;
