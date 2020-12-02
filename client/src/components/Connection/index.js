import React from "react";
import styled from "styled-components";
import FakeBanner from "../../assets/fake_banner.jpg";
import { COLORS } from "../../constants";

const Connection = () => {
  return (
    <>
      <MainContainer>
        <Banner src={FakeBanner} />
        <Title>Lorem Ipsum Connection Between Book A and Book C</Title>
        <Author>
          <NameContainer>
            <Avatar />
            <AuthorName>John Smith</AuthorName>
          </NameContainer>
          <AuthorUserName>@jsmith</AuthorUserName>
        </Author>
        <Line />
        <BooksConnected>
          <BookTitle>Book A</BookTitle>
          <BookTitle>Book B</BookTitle>
        </BooksConnected>
        <CategoryLabelsContainer>
          <CategoryLabel>Psychology</CategoryLabel>
          <CategoryLabel>Mathematics</CategoryLabel>
        </CategoryLabelsContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Banner = styled.img`
  height: 100px;
  width: 100%;
`;

const Title = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
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
  width: 300px;
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

export default Connection;
