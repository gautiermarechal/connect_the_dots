import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  startPostConnection,
  receivePostConnection,
  errorPostConnection,
} from "../../redux/actions/PostConnectionActions";
import SearchBar from "../SearchBar/index";

const PostConnection = () => {
  const dispatch = useDispatch();
  const postConnection = useSelector((state) => state.postConnection);
  useEffect(() => {
    dispatch(startPostConnection());
  }, []);

  return (
    <>
      <MainContainer>
        <ChooseBooksSection>
          <Title>Choose 2 or more books:</Title>
          <SearchBar />
          <BooksChosenList>
            {postConnection.post_connection.books.map((book) => {
              return <BookItem>{book.volumeInfo.title}</BookItem>;
            })}
          </BooksChosenList>
        </ChooseBooksSection>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 100px 50px 100px;
`;

const ChooseBooksSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BooksChosenList = styled.ul`
  list-style-type: none;
`;

const BookItem = styled.li``;

const Title = styled.h1`
  font-weight: 100;
`;

export default PostConnection;
