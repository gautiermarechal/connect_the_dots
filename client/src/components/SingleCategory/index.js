import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetchSingleCategory from "../../customHooks/UseFetchSingleCategory";
import useFetchCategoryConnections from "../../customHooks/UseFetchCategoryConnections";
import { useSelector } from "react-redux";
import Feed from "../Feed";

const SingleCategory = () => {
  const id = useParams().id;
  useFetchSingleCategory(id);
  useFetchCategoryConnections(id);
  const singleCategory = useSelector((state) => state.singleCategory);
  return (
    <>
      <MainContainer>
        {singleCategory.single_category ? (
          <>
            <Title>{singleCategory.single_category.name}</Title>
            <Line />
            <Feed type="SingleCategory" />
          </>
        ) : null}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  height: 70vh;
`;

const InternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

const Title = styled.h1``;

const Line = styled.hr`
  width: 80%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export default SingleCategory;
