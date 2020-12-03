import React from "react";
import styled from "styled-components";

const BookPage = () => {
  return (
    <>
      <MainContainer>
        <BookInfoContainer>
          <BookInfoContainer>
            <CoverImage />
            <BookInfo></BookInfo>
          </BookInfoContainer>
        </BookInfoContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookInfoContainer = styled.div`
  display: flex;
`;

const CoverImage = styled.img``;

const BookInfo = styled.div``;

const RelatedConnections = styled.div``;

export default BookPage;
