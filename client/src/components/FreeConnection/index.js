import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addTitlePostConnection,
  changeAllPostConnection,
  createPostConnection,
  getContentPostConnection,
} from "../../redux/actions/PostConnectionActions";
import PreviousButtonPush from "../FreeConnection/PreviousButtonPush";
import RichTextEditor from "../RichTextEditor";
import TextEditor from "../TextEditor";

const FreeConnection = () => {
  const postConnection = JSON.parse(localStorage.getItem("post-connection"));
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.id === "") {
      return;
    }

    dispatch(
      createPostConnection({
        postConnection: postConnection,
        author: {
          _id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
        },
      })
    );
  }, [currentUser]);

  return (
    <>
      <MainContainer>
        <PreviousButtonPush />
        <Title>Write your connection</Title>
        <TitleLabel>Title: </TitleLabel>
        <TitleInput
          onChange={(e) => dispatch(addTitlePostConnection(e.target.value))}
        />
        <BooksToConnectContainer>
          {postConnection.post_connection.books.map((book) => {
            return (
              <Book key={book.id}>
                {book.volumeInfo.imageLinks ? (
                  <BookImage src={book.volumeInfo.imageLinks.thumbnail} />
                ) : null}

                <BookInfo>
                  <BookTitle>{book.volumeInfo.title}</BookTitle>
                  <Authors>
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.map((author) => {
                          return <p key={author}>{author}</p>;
                        })
                      : null}
                  </Authors>
                </BookInfo>
              </Book>
            );
          })}
        </BooksToConnectContainer>
        <TextEditorContainer>
          <TextEditor />
        </TextEditorContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BooksToConnectContainer = styled.div`
  display: flex;
  overflow: scroll;
  width: 80vw;
  margin-bottom: 20px;
`;

const Book = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 7px;
  height: 140px;
  margin: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: scroll;
`;

const BookImage = styled.img`
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  height: 100%;
`;

const BookTitle = styled.h4``;

const Authors = styled.h5`
  font-weight: 200;
  margin-top: 5px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const TextEditorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleLabel = styled.h3``;
const TitleInput = styled.input``;

export default FreeConnection;
