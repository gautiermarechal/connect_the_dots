import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  requestBooks,
  receiveBooks,
  errorBooks,
  clearBooks,
} from "../../redux/actions/BooksActions";
import { COLORS } from "../../constants";
import { Link } from "react-router-dom";
import {
  addBookPostConnection,
  addCategoryPostConnection,
} from "../../redux/actions/PostConnectionActions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const booksFound = useSelector((state) => state.books);
  const postConnection = useSelector((state) => state.postConnection);
  const searchBarRef = useRef(null);

  const handleSearchBook = (query) => {
    dispatch(requestBooks());
    fetch(`http://localhost:4000/books?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveBooks(json.data.items));
      })
      .catch((err) => {
        dispatch(errorBooks());
      });
  };

  const handleClear = () => {
    searchBarRef.current.value = "";
    dispatch(clearBooks());
  };

  const ResultContainer = styled.div`
    display: ${booksFound.books && booksFound.books.length !== 0
      ? "block"
      : "none"};
    position: absolute;
    height: auto;
    background-color: #ffff;
    padding: 20px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    border-radius: 7px;
  `;

  return (
    <>
      <MainContainer>
        <BarContainer
          placeholder="Search for a connection, book, category..."
          onChange={(e) => handleSearchBook(e.target.value)}
          ref={searchBarRef}
        />
        <ResultContainer>
          <ListOfResults>
            {booksFound.books &&
              booksFound.books.map((book) => {
                const id = book.id;
                const title = book.volumeInfo.title;
                const subtitle = book.volumeInfo.subtitle;
                const authors = book.volumeInfo.authors;
                const categories = book.volumeInfo.categories;

                return (
                  <>
                    {/* If the user is posting render this:  */}
                    {postConnection.status === "started" ? (
                      <Book
                        onClick={() => {
                          dispatch(addBookPostConnection(book));
                          categories.forEach((category) => {
                            dispatch(addCategoryPostConnection(category));
                          });
                          handleClear();
                        }}
                      >
                        <BookTitle>{title}</BookTitle>
                        <BookSubTitle>{subtitle}</BookSubTitle>
                        {authors && (
                          <AuthorsContainer>
                            {authors.map((author) => (
                              <Author>{author}</Author>
                            ))}
                          </AuthorsContainer>
                        )}
                      </Book>
                    ) : (
                      <Link to={`/book/${id}`}>
                        <Book>
                          <BookTitle>{title}</BookTitle>
                          <BookSubTitle>{subtitle}</BookSubTitle>
                          {authors && (
                            <AuthorsContainer>
                              {authors.map((author) => (
                                <Author>{author}</Author>
                              ))}
                            </AuthorsContainer>
                          )}
                        </Book>
                      </Link>
                    )}
                    <Line />
                  </>
                );
              })}
          </ListOfResults>
        </ResultContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  position: relative;
`;

const BarContainer = styled.input`
  border-style: solid;
  border-color: #d3d7d7;
  border-width: 1px;
  border-radius: 7px;
  width: 325px;
  height: 40px;
  padding: 15px;
`;

const ListOfResults = styled.ul``;

const Book = styled.li`
  margin-top: 10px;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.lightGreen};
  }
`;

const BookTitle = styled.h4`
  display: flex;
  flex-direction: column;
`;

const BookSubTitle = styled.h6`
  font-weight: 200;
`;

const AuthorsContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Author = styled.h6`
  font-style: italic;
  font-weight: 400;
  color: grey;
`;

const Line = styled.hr`
  width: 300px;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export default SearchBar;
