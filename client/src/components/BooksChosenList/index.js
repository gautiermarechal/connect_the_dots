import styled from "styled-components";
import { COLORS } from "../../constants";

const BooksChosenListComponent = ({ postConnection }) => {
  return (
    <>
      <BooksChosenList>
        {postConnection.post_connection.books.map((book, index) => {
          if (index % 2 !== 0) {
            return (
              <GridItem>
                <Wrapper>
                  {book.volumeInfo.imageLinks ? (
                    <CoverImage src={book.volumeInfo.imageLinks.thumbnail} />
                  ) : null}
                  <BookItem>
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
              <Wrapper>
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
            </GridItem>,
            <GridItem>
              <NormalLine />
            </GridItem>,
          ];
        })}
      </BooksChosenList>
    </>
  );
};

const BooksChosenList = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: 33.333333% 33.333333% 33.333333%;
  margin-top: 50px;
  width: 100vw;
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 7px;
  min-width: 400px;
`;

const CoverImage = styled.img`
  margin-right: 20px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
`;

const MultipleThreeLine = styled.hr``;

const NormalLine = styled.hr`
  border: 0;
  height: 0;
  width: 80%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export default BooksChosenListComponent;
