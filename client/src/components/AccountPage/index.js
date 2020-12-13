import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountPage = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      <MainContainer>
        <UserInfo>
          <Title>User info</Title>
          <InfoContainer>
            <Label>Name:</Label>
            <Info>{currentUser.name}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Username:</Label>
            <Info>@{currentUser.username}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Email:</Label>
            <Info>{currentUser.email}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Connections Posted:</Label>
            <Info>{currentUser.connections.length}</Info>
          </InfoContainer>
          <InfoContainer>
            <Label>Connections Bookmarked:</Label>
            <Info>{currentUser.connections_bookmarked.length}</Info>
          </InfoContainer>
          <LogoutButton
            onClick={() => {
              history.push("/");
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
  height: 80vh;
`;

const Title = styled.h2``;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  border-style: none;
  border-width: 1px;
  border-radius: 7px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
`;

const InfoContainer = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.h3`
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
