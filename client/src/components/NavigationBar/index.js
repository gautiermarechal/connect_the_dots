import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";

const NavigationBar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <>
      <MainContainer>
        <Link to="/">
          <MainTitle>Connect the dots.</MainTitle>
        </Link>
        <SearchBar />
        <NavItem>Categories</NavItem>
        {currentUser.status === "received" ? (
          <>
            <Link to={`/account/${currentUser.id}`}>
              <NavItem>
                <FaUserCircle />
              </NavItem>
            </Link>
            <Link to={`/home-feed/${currentUser.id}`}>
              <NavItem>
                <AiFillHome />
              </NavItem>
            </Link>
            <Link to={`/connections-bookmarked/${currentUser.id}`}>
              <NavItem>
                <BsFillBookmarkFill />
              </NavItem>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <NavItem>Login</NavItem>
            </Link>
            <Link to="/signup">
              <NavItem>Sign Up</NavItem>
            </Link>
          </>
        )}
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

const LogOut = styled.h5`
  cursor: pointer;
`;

export default NavigationBar;
