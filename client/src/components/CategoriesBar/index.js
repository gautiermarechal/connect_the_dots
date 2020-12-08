import React from "react";
import styled from "styled-components";
import { CATEGORIES, COLORS } from "../../constants";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoriesBar = () => {
  const history = useHistory();
  const categoriesBarOpened = useSelector(
    (state) => state.categories.categories_bar_opened
  );
  const MainContainer = styled.div`
    display: ${categoriesBarOpened ? "flex" : "none"};
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 120px;
    padding: 20px;
  `;
  return (
    <>
      <MainContainer>
        <AllCategoriesButton onClick={() => history.push("/categories")}>
          All
        </AllCategoriesButton>
        <FirstRow>
          {CATEGORIES.slice(0, 6).map((category) => {
            return (
              <CategoryButton
                key={category._id}
                onClick={() => {
                  history.push(`/categories/${category._id}`);
                  window.location.reload();
                }}
              >
                {category.name}
              </CategoryButton>
            );
          })}
        </FirstRow>
        <SecondRow>
          {CATEGORIES.slice(6).map((category) => {
            return (
              <CategoryButton
                key={category._id}
                onClick={() => {
                  history.push(`/categories/${category._id}`);
                  window.location.reload();
                }}
              >
                {category.name}
              </CategoryButton>
            );
          })}
        </SecondRow>
      </MainContainer>
    </>
  );
};

const FirstRow = styled.div`
  display: flex;
  justify-content: center;
`;
const SecondRow = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryButton = styled.button`
  background-color: ${COLORS.green};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
`;

const AllCategoriesButton = styled.button`
  background-color: ${COLORS.grey};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
`;

export default CategoriesBar;
