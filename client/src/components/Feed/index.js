import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  errorConnections,
  receiveConnections,
  requestConnections,
} from "../../redux/actions/ConnectionsActions";
import Connection from "../Connection/index";
import PublishedModal from "../PublishedModal";

const Feed = ({ type }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const feedConnections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  useEffect(() => {
    if (type === "Home") {
      if (!currentUser) {
        return;
      }
      dispatch(requestConnections());
      fetch(`http://localhost:4000/connections/feed/${currentUser.id}`)
        .then((res) => res.json())
        .then((json) => {
          dispatch(receiveConnections(json.data));
        })
        .catch(() => dispatch(errorConnections()));
    }
  }, [currentUser]);

  return (
    <>
      <Wrapper>
        <Title>{type}</Title>
        <Line />
        <MainContainer>
          {feedConnections.connections
            ? feedConnections.connections.map((connection) => (
                <Connection data={connection} />
              ))
            : null}
        </MainContainer>
        <PublishedModal />
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
