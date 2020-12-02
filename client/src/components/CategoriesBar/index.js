import React from "react";
import styled from "styled-components";
import { CATEGORIES, COLORS } from "../../constants";

const CategoriesBar = () => {
  return (
    <>
      <MainContainer>
        <FirstRow>
          {CATEGORIES.slice(0, 6).map((category) => {
            return <CategoryButton key={category}>{category}</CategoryButton>;
          })}
        </FirstRow>
        <SecondRow>
          {CATEGORIES.slice(6).map((category) => {
            return <CategoryButton key={category}>{category}</CategoryButton>;
          })}
        </SecondRow>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 20px;
`;

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

export default CategoriesBar;
