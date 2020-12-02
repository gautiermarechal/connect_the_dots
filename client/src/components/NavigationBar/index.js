import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/index";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <MainContainer>
        <Link to="/">
          <MainTitle>Connect the dots.</MainTitle>
        </Link>
        <SearchBar />
        <NavItem>Categories</NavItem>
        <Link to="/login">
          <NavItem>Login</NavItem>
        </Link>
        <Link to="/signup">
          <NavItem>Sign Up</NavItem>
        </Link>
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
