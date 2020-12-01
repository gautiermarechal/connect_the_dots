import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/index";

const NavigationBar = () => {
  return (
    <>
      <MainContainer>
        <MainTitle>Connect the dots.</MainTitle>
        <SearchBar />
        <NavItem>Categories</NavItem>
        <NavItem>Login</NavItem>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 78px;
  padding: 20px;
`;

const MainTitle = styled.h1`
  font-weight: 800;
`;

const NavItem = styled.h3`
  cursor: pointer;
`;

export default NavigationBar;
