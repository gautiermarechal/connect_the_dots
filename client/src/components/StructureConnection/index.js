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
import { COLORS } from "../../constants";

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
        <TitleInput
          onChange={(e) => dispatch(addTitlePostConnection(e.target.value))}
          placeholder="Title"
        />
        <FileInputContainer>
          <FileInputLabel htmlFor="file-input">
            Choose file
            <FileInput
              id="file-input"
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
          </FileInputLabel>
        </FileInputContainer>

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
                    <BookCategories>
                      {book.volumeInfo.categories
                        ? book.volumeInfo.categories.map((category) => (
                            <CategoryButton>{category}</CategoryButton>
                          ))
                        : null}
                    </BookCategories>
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

const TitleInput = styled.input`
  border-radius: 7px;
  border-style: none;
  border-width: 1px;
  height: 100px;
  width: 70vw;
  font-size: 50px;
  outline: none;
  padding: 20px;
  background-color: inherit;
  &::-webkit-input-placeholder {
    padding-top: 5px;
    font-size: 50px;
  }
`;

const FileInputContainer = styled.div`
  display: flex;
  width: 70vw;
`;

const FileInputLabel = styled.label`
  padding: 20px;
  font-size: 20px;
  cursor: pointer;

  [type="file"] {
    border: 0;
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
  }
`;

const FileInput = styled.input`
  &::-webkit-file-upload-button {
    visibility: none;
  }
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 80vw;
`;

const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Book = styled.div`
  display: flex;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  border-radius: 7px;
  height: 140px;
  width: 400px;
  margin: 20px;
  background-color: white;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  cursor: pointer;
  margin-top: 20px;
`;

export default StructureConnection;
