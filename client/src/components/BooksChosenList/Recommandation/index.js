import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLORS } from "../../../constants";
import { addBookPostConnection } from "../../../redux/actions/PostConnectionActions";

const Recommandation = () => {
  const postConnection = useSelector(
    (state) => state.postConnection && state.postConnection
  );

  const dispatch = useDispatch();

  const [recommandationsList, setRecommandationsList] = useState([]);
  useEffect(() => {
    if (
      postConnection.post_connection.books.length === 1 &&
      postConnection.post_connection.books[0].volumeInfo.categories
    ) {
      //fetch book based on matching category, based on a category already connected to the category selected,
      fetch(
        `http://localhost:4000/books/category?category=${postConnection.post_connection.books[0].volumeInfo.categories[0]}`
      )
        .then((res) => res.json())
        .then((json) => {
          setRecommandationsList([...recommandationsList, json.data]);
        });

      //   fetch(
      //     `http://localhost:4000/connections/category/name/${postConnection.post_connection.books[0].volumeInfo.categories[0]}`
      //   )
      //     .then((res) => res.json())
      //     .then((json) => {
      //       console.log(json.data[0]);
      //       const possibleBooks = json.data[0].books.filter(
      //         (book) =>
      //           book.volumeInfo.categories[0] !==
      //           postConnection.post_connection.books[0].volumeInfo.categories[0]
      //       );

      //       const min = 0;
      //       const max = possibleBooks.length - 1;
      //       const indexToPick = Math.floor(Math.random() * (max - min) + min);

      //       setRecommandationsList([
      //         ...recommandationsList,
      //         possibleBooks[indexToPick],
      //       ]);
      //     });
    }
  }, []);

  return (
    <>
      <MainContainer>
        {recommandationsList.map((book) => (
          <Wrapper
            onClick={() => {
              dispatch(addBookPostConnection(book));
            }}
          >
            {book.volumeInfo.imageLinks ? (
              <CoverImage src={book.volumeInfo.imageLinks.thumbnail} />
            ) : null}
            <BookItem>
              <BookTitle>{book.volumeInfo.title}</BookTitle>
              <BookSubTitle>{book.volumeInfo.subtitle}</BookSubTitle>
              <Authors>
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.map((author) => <p>{author}</p>)
                  : null}
              </Authors>
              <BookCategories>
                {book.volumeInfo.categories
                  ? book.volumeInfo.categories.map((category) => (
                      <CategoryButton>{category}</CategoryButton>
                    ))
                  : null}
              </BookCategories>
            </BookItem>
          </Wrapper>
        ))}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BookItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 200px;
`;

const BookTitle = styled.h4``;

const BookSubTitle = styled.h5`
  font-weight: 200;
  font-style: italic;
  margin-bottom: 10px;
`;

const Authors = styled.h5`
  font-weight: 200;
  margin-bottom: 20px;
`;

const BookCategories = styled.div`
  display: flex;
`;

const CategoryButton = styled.button`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  border-radius: 7px;
  background-color: white;
  opacity: 0.5;
  cursor: pointer;
`;

const CoverImage = styled.img`
  margin-right: 20px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

export default Recommandation;
