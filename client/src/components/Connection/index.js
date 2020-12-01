import React from "react";
import styled from "styled-components";
import FakeBanner from "../../assets/fake_banner.jpg";

const Connection = () => {
  return (
    <>
      <MainContainer>
        <Banner src={FakeBanner} />
        <Title>Lorem Ipsum Connection Between Book A anb Book C</Title>
        <Line />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Banner = styled.img`
  height: 74px;
  width: 100%;
`;

const Title = styled.h3``;

const Line = styled.hr`
  width: 300px;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export default Connection;
