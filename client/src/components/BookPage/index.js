import React from "react";
import styled from "styled-components";
import useFetchSingleBook from "../../customHooks/UseFetchSingleBook";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants";
import Feed from "../Feed";
import { addBookPostConnection } from "../../redux/actions/PostConnectionActions";
import { AiOutlineCheck } from "react-icons/ai";
import updateUser from "../../handlers/UpdateUser";

const BookPage = () => {
  const { id } = useParams();
  useFetchSingleBook(id);
  const singleBook = useSelector((state) => state.singleBook.single_book);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [bookBookmarked, setBookBookmarked] = React.useState(false);

  React.useEffect(() => {
    if (!singleBook || !currentUser) {
      return;
    }
    if (currentUser.books_bookmarked) {
      if (currentUser.books_bookmarked.length !== 0) {
        if (
          currentUser.books_bookmarked.some((book) => book.id === singleBook.id)
        ) {
          setBookBookmarked(true);
        } else {
          setBookBookmarked(false);
        }
      }
    }
  }, [singleBook, currentUser]);

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
            <ActionButton
              onClick={() => {
                dispatch(addBookPostConnection(singleBook));
                history.push("/connect");
              }}
            >
              Connect
            </ActionButton>
            {!bookBookmarked ? (
              <ActionButton
                onClick={() => {
                  updateUser(currentUser.id, "books_bookmarked", singleBook);
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
              >
                Bookmark
              </ActionButton>
            ) : (
              <ActionButton>
                <AiOutlineCheck />
              </ActionButton>
            )}
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
  align-items: center;
  justify-content: center;
`;

const BookInfoContainer = styled.div`
  display: flex;
  width: 70vw;
  background-color: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  margin-top: 20px;
`;

const CoverImageContainer = styled.div`
  width: 120px;
`;

const CoverImage = styled.img`
  margin-right: 20px;
  height: auto;
  width: fit-content;
  border-radius: 7px;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-bottom: 10px;
  height: 400px;
  overflow: scroll;
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

const Description = styled.p`
  margin-top: 20px;
`;

const BookCategories = styled.div`
  display: flex;
`;

const CategoryButton = styled.button`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 7px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.darkBlue};
  }
`;

const ActionBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;
const ActionButton = styled.button`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 7px;
  color: white;
  padding: 5px;
  width: 300px;
  margin: 2px;
  height: 40px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${COLORS.darkBlue};
  }
`;

export default BookPage;
