import React from "react";
import styled from "styled-components";
import FakeBanner from "../../assets/fake_banner.jpg";
import { COLORS } from "../../constants";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Connection = ({ data }) => {
  const history = useHistory();
  return (
    <>
      {data ? (
        <MainContainer>
          <Banner
            src={`http://localhost:4000/${data.bannerSrc}`}
            onClick={() => {
              history.push(`/connection/${data._id}`);
            }}
          />
          <Title
            onClick={() => {
              history.push(`/connection/${data._id}`);
            }}
          >
            {data.title}
          </Title>
          <Author>
            <NameContainer>
              <Avatar />
              <AuthorName>{data.author.name}</AuthorName>
            </NameContainer>
            <DateContainer>
              <AuthorUserName
                onClick={() => history.push(`/user/${data.author._id}`)}
              >
                @{data.author.username}
              </AuthorUserName>
              <Date>{moment.unix(data.created_at).format("MM/DD/YYYY")}</Date>
            </DateContainer>
          </Author>
          <Line />
          <BooksConnected>
            {data.books.map((book) => {
              return <BookTitle>{book.volumeInfo.title}</BookTitle>;
            })}
          </BooksConnected>
          <CategoryLabelsContainer>
            {data.categories.map((category) => {
              return <CategoryLabel>{category}</CategoryLabel>;
            })}
          </CategoryLabelsContainer>
        </MainContainer>
      ) : (
        <MainContainer>
          <Banner src={FakeBanner} />
          <Title>Fake Title</Title>
          <Author>
            <NameContainer>
              <Avatar />
              <AuthorName>Fake Name</AuthorName>
            </NameContainer>
            <AuthorUserName>Fake Username</AuthorUserName>
          </Author>
          <Line />
          <BooksConnected>Fake Title</BooksConnected>
          <BooksConnected>Fake Title</BooksConnected>
          <CategoryLabelsContainer>
            <CategoryLabel>Category</CategoryLabel>
            <CategoryLabel>Category</CategoryLabel>
          </CategoryLabelsContainer>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
`;

const Banner = styled.img`
  height: 100px;
  width: 100%;
  cursor: pointer;
  border-radius: 7px;
`;

const Title = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
`;

const AuthorName = styled.h5`
  cursor: pointer;
`;

const Avatar = styled.img`
  height: 20px;
  border-radius: 50%;
`;

const AuthorUserName = styled.h6`
  color: rgba(0, 0, 0, 0.3);
  font-weight: 10;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Line = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

const BooksConnected = styled.ul`
  list-style-type: none;
`;

const BookTitle = styled.li`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CategoryLabelsContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const CategoryLabel = styled.button`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 50px;
  overflow: scroll;
  cursor: pointer;
`;

const DateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Date = styled.h5``;

export default Connection;
