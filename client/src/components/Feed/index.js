import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  errorConnections,
  receiveConnections,
  requestConnections,
} from "../../redux/actions/ConnectionsActions";
import { receiveSingleCategoryConnections } from "../../redux/actions/SingleCategoryConnectionsActions";
import { receiveSingleUser } from "../../redux/actions/SingleUserActions";
import Connection from "../Connection/index";
import LoadingSpinner from "../LoadingSpinner";
import PublishedModal from "../PublishedModal";

const Feed = ({ type }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const feedConnections = useSelector((state) => state.connections);
  const singleCategoryConnections = useSelector(
    (state) => state.singleCategoryConnections
  );
  const singleUser = useSelector((state) => state.singleUser.single_user);
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
    if (type === "SingleCategory") {
      dispatch(requestConnections());
      if (!singleCategoryConnections.connections) {
        return;
      }

      dispatch(receiveConnections(singleCategoryConnections.connections));
    }

    if (type === "SingleUser") {
      dispatch(requestConnections());
      if (!singleUser.connections) {
        return;
      }

      dispatch(receiveConnections(singleUser.connections));
    }

    if (type === "ConnectionsBookmarked") {
      dispatch(requestConnections());
      if (!currentUser.connections_bookmarked) {
        return;
      }

      dispatch(receiveConnections(currentUser.connections_bookmarked));
    }
  }, [currentUser, singleCategoryConnections, singleUser]);

  return (
    <>
      {feedConnections.status === "received" ||
      feedConnections.status === "idle" ? (
        <Wrapper>
          {type !== "SingleCategory" &&
          type !== "SingleUser" &&
          type !== "ConnectionsBookmarked" ? (
            <Title>{type}</Title>
          ) : null}
          <Line />
          <MainContainer>
            {feedConnections.connections
              ? feedConnections.connections.map((connection) => (
                  <Connection data={connection} />
                ))
              : null}
          </MainContainer>
        </Wrapper>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 50px;
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
