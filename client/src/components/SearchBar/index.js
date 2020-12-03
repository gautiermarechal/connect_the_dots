import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  requestBooks,
  receiveBooks,
  errorBooks,
} from "../../redux/actions/BooksActions";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchBook = (query) => {
    dispatch(requestBooks());
    fetch(`http://localhost:4000/books?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveBooks(json));
      })
      .catch((err) => {
        dispatch(errorBooks());
      });
  };

  return (
    <>
      <BarContainer
        placeholder="Search for a connection, book, category..."
        onChange={(e) => handleSearchBook(e.target.value)}
      />
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
