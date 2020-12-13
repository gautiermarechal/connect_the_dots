import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar/index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { COLORS } from "../../constants";
import { toggleCategoriesBar } from "../../redux/actions/CategoriesActions";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const categoriesBarOpened = useSelector(
    (state) => state.categories.categories_bar_opened
  );
  return (
    <>
      <MainContainer>
        <Link to="/">
          <MainTitle>Connect the dots.</MainTitle>
        </Link>
        <SearchBar />
        <Link
          onClick={() => {
            if (categoriesBarOpened) {
              dispatch(toggleCategoriesBar(false));
            } else {
              dispatch(toggleCategoriesBar(true));
            }
          }}
        >
          <NavItem>Categories</NavItem>
        </Link>
        {currentUser.status === "received" ? (
          <>
            <Link to={`/account/${currentUser.id}`}>
              <NavItem>
                <FaUserCircle />
              </NavItem>
            </Link>
            <Link to={`/feed/${currentUser.id}`}>
              <NavItem>
                <AiFillHome />
              </NavItem>
            </Link>
            <Link to={`/connections-bookmarked/${currentUser.id}`}>
              <NavItem>
                <BsFillBookmarkFill />
              </NavItem>
            </Link>
            <Link to="/connect">
              <NavItem>
                <ConnectButton>Connect</ConnectButton>
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
            <Link to="/login">
              <NavItem>
                <ConnectButton>Connect</ConnectButton>
              </NavItem>
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
  background-color: white;
`;

const MainTitle = styled.h1`
  font-weight: 800;
`;

const NavItem = styled.h3`
  cursor: pointer;
`;

const ConnectButton = styled.div`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  display: flex;
    justify-content: center;
    align-items: center;
}
`;

export default NavigationBar;
