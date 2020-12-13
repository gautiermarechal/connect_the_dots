import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Categories = () => {
  const categories = useSelector((state) => state.categories);
  const history = useHistory();
  return (
    <>
      <MainContainer>
        <InternalContainer>
          <Title>Categories</Title>
          <Line />
          <CategoriesList>
            {categories.status === "received" ? (
              categories.categories.map((category) => {
                return (
                  <CategoryItem
                    key={category._id}
                    onClick={() => history.push(`/categories/${category._id}`)}
                  >
                    <CategoryTitle>{category.name}</CategoryTitle>
                  </CategoryItem>
                );
              })
            ) : (
              <CategoryItem>
                <CategoryTitle>Loading</CategoryTitle>
              </CategoryItem>
            )}
          </CategoriesList>
        </InternalContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const InternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

const Title = styled.h1``;

const Line = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: 33.33333% 33.33333% 33.33333%;
`;

const CategoryItem = styled.button`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background-color: white;
  margin: 5px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);

  border: none;
  transition: 0.2s;
  border-radius: 7px;

  &:hover {
    background-color: ${COLORS.blue};
    color: white;
    cursor: pointer;
  }
`;

const CategoryTitle = styled.h1``;

export default Categories;
