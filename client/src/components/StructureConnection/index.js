import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PreviousButtonPush from "../FreeConnection/PreviousButtonPush";
import {
  addBannerPostConnection,
  addConceptToBook,
  addTitlePostConnection,
  changeAllPostConnection,
  createPostConnection,
  getContentPostConnection,
  initialiseContentStructurePostConnection,
} from "../../redux/actions/PostConnectionActions";
import ConceptsContainerComponent from "./ConceptsContainer";
import LinksContainerComponent from "./LinksContainer";

const StructureConnection = () => {
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
        <TitleLabel>Thumbnail Image</TitleLabel>
        <TitleInput
          onChange={(e) => {
            const formData = new FormData();
            formData.append("banner", e.target.files[0]);
            console.log(e.target.files[0]);
            fetch("http://localhost:4000/connections/upload", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((json) => {
                dispatch(addBannerPostConnection(json.data.path));
              });
          }}
          type="file"
          accept="image/*"
          name="banner"
        />
        <BookList>
          {postConnection.post_connection.books.map((book, index) => {
            return (
              <BookWrapper>
                <Book key={book.id} index={index}>
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
                <ConceptsContainerComponent
                  indexBook={index}
                  postConnection={postConnection}
                />
              </BookWrapper>
            );
          })}
        </BookList>
        <LinksContainerComponent postConnection={postConnection} />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const TitleLabel = styled.h3``;

const TitleInput = styled.input``;

const BookList = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export default StructureConnection;
