import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addBannerPostConnection,
  addTitlePostConnection,
  createPostConnection,
} from "../../redux/actions/PostConnectionActions";
import PreviousButtonPush from "../FreeConnection/PreviousButtonPush";
import TextEditor from "../TextEditor";
import { useSpring, animated } from "react-spring";

const FreeConnection = () => {
  const postConnection = JSON.parse(localStorage.getItem("post-connection"));
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [previewSrc, setPreviewSrc] = useState("");

  const animation1 = useSpring({
    config: { duration: 1000, velocity: 1000 },
    delay: 250,

    opacity: 1,
    from: { opacity: 0 },
  });

  const animation = useSpring({
    transform: "translate3D(0,0,0)",
    opacity: 1,
    from: {
      transform: "translate3D(0,-50px,0)",
      opacity: 0,
    },
  });

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
      <MainContainer style={animation}>
        <PreviousContainer>
          <PreviousButtonPush />
        </PreviousContainer>
        <TitleInput
          onChange={(e) => dispatch(addTitlePostConnection(e.target.value))}
          placeholder="Title"
        />
        <FileInputContainer>
          <FileInputLabel htmlFor="file-input">
            Choose an image
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
                    setPreviewSrc(json.data.path);
                  });
              }}
              type="file"
              accept="image/*"
              name="banner"
            />
          </FileInputLabel>
        </FileInputContainer>
        {previewSrc && (
          <ImagePreview
            src={`http://localhost:4000/${previewSrc}`}
            style={animation1}
          />
        )}
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

const MainContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BooksToConnectContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 80vw;
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

const TextEditorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const FileInput = styled.input`
  &::-webkit-file-upload-button {
    visibility: none;
  }
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

const FileInputContainer = styled.div`
  display: flex;
  width: 70vw;
`;

const PreviousContainer = styled.div`
  display: flex;
  width: 80vw;
  justify-content: flex-start;
`;

const ImagePreview = styled(animated.img)`
  border-radius: 7px;
  width: 80vw;
`;

export default FreeConnection;
