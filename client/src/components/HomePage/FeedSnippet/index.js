import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Connection from "../../Connection";

const FeedSnippet = ({ type }) => {
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    if (!connections) {
      return;
    }
    if (type === "recent") {
      fetch("http://localhost:4000/recent/connections")
        .then((res) => res.json())
        .then((json) => {
          setConnections(json.data);
        });
    }
  }, [connections]);
  return (
    <>
      <MainContainer>
        {type === "recent" && <Title>Recent Connections</Title>}
        {type === "popular" && <Title>Popular Connections</Title>}
        <FeedContainer>
          {connections
            ? connections.map((connection) => {
                return <Connection data={connection} />;
              })
            : null}
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
