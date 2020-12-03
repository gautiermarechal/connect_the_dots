import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const AccountPage = () => {
  return (
    <>
      <MainContainer>
        <UserInfo>
          <Title>User info</Title>
          <InfoContainer>
            <Label>Name:</Label>
            <Info>John</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Username:</Label>
            <Info>John</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Email:</Label>
            <Info>John</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Connections Posted:</Label>
            <Info>John</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Connections Bookmarked:</Label>
            <Info>John</Info>
          </InfoContainer>
          <LogoutButton
            onClick={() => {
              localStorage.removeItem("user-email");
              window.location.reload();
            }}
          >
            Logout
          </LogoutButton>
        </UserInfo>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2``;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(211, 215, 215);
  border-radius: 7px;
  padding: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Label = styled.h5`
  font-weight: 800;
`;

const Info = styled.h5`
  font-weight: 200;
`;

const LogoutButton = styled.button`
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

export default AccountPage;
