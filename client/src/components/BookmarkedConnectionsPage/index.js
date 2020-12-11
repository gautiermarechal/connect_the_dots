import React from "react";
import styled from "styled-components";
import Feed from "../Feed";

const BookmarkedConnectionsPage = () => {
  return (
    <>
      <MainContainer>
        <BookmarkedConnections>
          <Title>Connections Bookmarked</Title>
          <Line />
          <Feed type="ConnectionsBookmarked" />
        </BookmarkedConnections>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const BookmarkedConnections = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3``;

const Line = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export default BookmarkedConnectionsPage;
