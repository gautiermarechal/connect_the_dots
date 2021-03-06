import styled from "styled-components";
import { COLORS } from "../../constants";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteBookPostConnection } from "../../redux/actions/PostConnectionActions";
import Recommandation from "./Recommandation";
import { useSpring, animated } from "react-spring";

const BooksChosenListComponent = ({ postConnection }) => {
  const dispatch = useDispatch();

  const animationBook = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    delay: 200,
  });

  const animationLine = useSpring({
    width: 300,
    delay: 500,
    from: { width: 0 },
  });
  return (
    <>
      <BooksChosenList>
        {postConnection.post_connection.books.map((book, index) => {
          if (index % 2 !== 0) {
            return (
              <GridItem>
                <Wrapper style={animationBook}>
                  {book.volumeInfo.imageLinks ? (
                    <CoverImage src={book.volumeInfo.imageLinks.thumbnail} />
                  ) : null}
                  <BookItem>
                    <BookHeader>
                      <CloseButton
                        onClick={() => {
                          dispatch(deleteBookPostConnection({ book: book }));
                        }}
                      >
                        <CloseIcon />
                      </CloseButton>
                    </BookHeader>
                    <BookTitle>{book.volumeInfo.title}</BookTitle>
                    <BookSubTitle>{book.volumeInfo.subtitle}</BookSubTitle>
                    <Authors>
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors.map((author) => (
                            <p>{author}</p>
                          ))
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
              </GridItem>
            );
          }
          return [
            <GridItem>
              <Wrapper style={animationBook}>
                {book.volumeInfo.imageLinks ? (
                  <CoverImage src={book.volumeInfo.imageLinks.thumbnail} />
                ) : null}
                <BookItem>
                  <BookHeader>
                    <CloseButton
                      onClick={() => {
                        dispatch(deleteBookPostConnection({ book: book }));
                      }}
                    >
                      <CloseIcon />
                    </CloseButton>
                  </BookHeader>
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
            </GridItem>,
            <GridItem>
              <NormalLine style={animationLine} />
            </GridItem>,
          ];
        })}
        {postConnection.post_connection.books.length === 1 && (
          <Recommandation />
        )}
      </BooksChosenList>
    </>
  );
};

const BooksChosenList = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 33.333333% 33.333333% 33.333333%;
  margin-top: 50px;
  width: 90vw;
`;

const BookItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
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

const Wrapper = styled(animated.div)`
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  border-radius: 7px;
  min-width: 400px;
  background-color: white;
`;

const CoverImage = styled.img`
  margin-right: 20px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

const NormalLine = styled(animated.hr)`
  border: 0;
  height: 0;
  width: 80%;
  border-top: 5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 5px solid rgba(255, 255, 255, 0.3);
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const BookHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  border-style: none;
  border-radius: 100%;
  background-color: transparent;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 25px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CloseIcon = styled(GrClose)`
  width: 15px;
  height: 15px;
`;

export default BooksChosenListComponent;
