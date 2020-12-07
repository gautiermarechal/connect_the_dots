import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetchSingleConnection from "../../customHooks/UseFetchSingleConnection";
import { AiOutlinePlusCircle, AiOutlineCheck } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import moment from "moment";
import parser from "html-react-parser";
import updateUser from "../../handlers/UpdateUser";

const SingleConnection = () => {
  const [authorBookmarked, setAuthorBookmarked] = useState(false);
  const [connectionBookmarked, setConnectionBookmarked] = useState(false);
  const connection = useSelector(
    (state) => state.singleConnection.single_connection
  );
  const currentUser = useSelector((state) => state.currentUser);
  const id = useParams().id;

  useEffect(() => {
    if (!connection) {
      return;
    }

    currentUser.authors_bookmarked.forEach((author) => {
      if (author._id === author._id) {
        setAuthorBookmarked(true);
      }
    });

    currentUser.connections_bookmarked.forEach((connectionParams) => {
      if (connectionParams._id === connection._id) {
        setConnectionBookmarked(true);
      }
    });
  }, [connection, currentUser]);

  useFetchSingleConnection(id);

  return (
    <>
      {connection._id ? (
        <MainContainer>
          <HeaderContainer>
            <Title>{connection.title}</Title>
            <BooksContainer>
              {connection.books.map((book) => {
                return (
                  <Book>
                    <BookImage src={book.volumeInfo.imageLinks.thumbnail} />
                    <BookInfo>
                      <BookTitle>{book.volumeInfo.title}</BookTitle>
                      <Authors>
                        {book.volumeInfo.authors.map((author) => {
                          return <p>{author}</p>;
                        })}
                      </Authors>
                    </BookInfo>
                  </Book>
                );
              })}
            </BooksContainer>
            <AuthorContainer>
              <AuthorNamesContainer>
                <AuthorName>{connection.author.name}</AuthorName>
                <AuthorUsername>@{connection.author.username}</AuthorUsername>
              </AuthorNamesContainer>
              <AuthorBookmarkButton
                onClick={() => {
                  if (!authorBookmarked) {
                    updateUser(
                      currentUser.id,
                      "authors_bookmarked",
                      connection.author
                    );
                  }
                }}
              >
                {authorBookmarked ? (
                  <AuthorAlreadyBookmarkedIcon />
                ) : (
                  <BookmarkAuthorIcon />
                )}
              </AuthorBookmarkButton>
            </AuthorContainer>
            <BottomHeaderContainer>
              <Date>
                {moment.unix(connection.created_at).format("MMM D, YYYY")}
              </Date>
              <AuthorBookmarkButton
                onClick={() => {
                  if (!connectionBookmarked) {
                    updateUser(
                      currentUser.id,
                      "connections_bookmarked",
                      connection
                    );
                  }
                }}
              >
                {connectionBookmarked ? (
                  <BookmarkConnectionIconeFilled />
                ) : (
                  <BookmarkConnectionIcone />
                )}
              </AuthorBookmarkButton>
            </BottomHeaderContainer>
          </HeaderContainer>
          <ThumbnailContainer>
            <ConnectionThumbailImage
              src={`http://localhost:4000/${connection.bannerSrc}`}
            />
          </ThumbnailContainer>
          <ContentContainer>{parser(connection.content)}</ContentContainer>
        </MainContainer>
      ) : null}
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 50;
`;

const BooksContainer = styled.div`
  display: grid;
  width: 70vw;
  max-width: 1000px;
  grid-template-columns: auto auto;
`;

const Book = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 7px;
  height: 140px;
  margin: 20px;
  max-width: 300px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  overflow: scroll;
`;

const BookImage = styled.img`
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  height: 100%;
`;

const BookTitle = styled.h2``;

const Authors = styled.h5`
  font-weight: 200;
  margin-top: 5px;
`;

const AuthorContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 30px;
`;

const AuthorNamesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const AuthorName = styled.h3``;

const AuthorUsername = styled.h5`
  font-weight: 200;
`;

const AuthorBookmarkButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 100%;
  cursor: pointer;
`;

const BookmarkAuthorIcon = styled(AiOutlinePlusCircle)`
  height: 30px;
  width: 30px;
`;

const AuthorAlreadyBookmarkedIcon = styled(AiOutlineCheck)`
  height: 30px;
  width: 30px;
`;

const BottomHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

const BookmarkConnectionIcone = styled(BsBookmark)`
  height: 30px;
  width: 30px;
`;

const BookmarkConnectionIconeFilled = styled(BsFillBookmarkFill)`
  height: 30px;
  width: 30px;
`;

const Date = styled.p``;

const ThumbnailContainer = styled.div``;

const ConnectionThumbailImage = styled.img`
  max-width: 90vw;
  border-radius: 7px;
`;

const ContentContainer = styled.div`
  max-width: 680px;
  font-size: 21px;
  line-height: 1.5;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export default SingleConnection;
