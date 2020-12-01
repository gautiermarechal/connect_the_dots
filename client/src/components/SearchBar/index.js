import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <>
      <BarContainer placeholder="Search for a connection, book, category..." />
    </>
  );
};

const BarContainer = styled.input`
  border-style: solid;
  border-color: #d3d7d7;
  border-width: 1px;
  border-radius: 7px;
  width: 325px;
  height: 40px;
  padding: 15px;
`;

export default SearchBar;
