import React from "react";
import styled from "styled-components";
import useFetchSingleBook from "../../customHooks/UseFetchSingleBook";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants";
import Feed from "../Feed";

const BookPage = () => {
  const { id } = useParams();
  useFetchSingleBook(id);
  const singleBook = useSelector((state) => state.singleBook.single_book);
  return (
    <>
      {singleBook.volumeInfo ? (
        <MainContainer>
          <BookInfoContainer>
            {singleBook.volumeInfo.imageLinks ? (
              <CoverImageContainer>
                <CoverImage src={singleBook.volumeInfo.imageLinks.thumbnail} />
              </CoverImageContainer>
            ) : null}
            <BookInfo>
              <BookTitle>{singleBook.volumeInfo.title}</BookTitle>
              <BookSubTitle>{singleBook.volumeInfo.subtitle}</BookSubTitle>
              <Authors>
                {singleBook.volumeInfo.authors
                  ? singleBook.volumeInfo.authors.map((author) => (
                      <p>{author}</p>
                    ))
                  : null}
              </Authors>
              <BookCategories>
                {singleBook.volumeInfo.categories
                  ? singleBook.volumeInfo.categories.map((category) => (
                      <CategoryButton>{category}</CategoryButton>
                    ))
                  : null}
              </BookCategories>
              <Description>{singleBook.volumeInfo.description}</Description>
            </BookInfo>
          </BookInfoContainer>
          <ActionBar>
            <ActionButton>Bookmark</ActionButton>
            <ActionButton>Connect</ActionButton>
          </ActionBar>
        </MainContainer>
      ) : null}
      <Feed type={"Related Connections"} />
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px;
`;

const BookInfoContainer = styled.div`
  display: flex;
`;

const CoverImageContainer = styled.div`
  width: 120px;
`;

const CoverImage = styled.img`
  margin-right: 20px;
  height: auto;
  width: fit-content;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 10px;
`;

const BookTitle = styled.h1``;

const BookSubTitle = styled.h4`
  font-weight: 200;
  font-style: italic;
  margin-bottom: 10px;
`;

const Authors = styled.h5`
  font-weight: 200;
  margin-bottom: 20px;
`;

const Description = styled.p``;

const BookCategories = styled.div`
  display: flex;
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

const ActionBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-top: 20px;
`;
const ActionButton = styled.button`
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

export default BookPage;
