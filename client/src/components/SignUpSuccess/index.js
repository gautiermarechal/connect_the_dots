import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useHistory } from "react-router-dom";

const SignUpSuccess = () => {
  const history = useHistory();
  return (
    <>
      <MainContainer>
        <Title>Your account has been successfully created!</Title>
        <LoginButton onClick={() => history.push("/login")}>Login</LoginButton>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Title = styled.h3``;

const LoginButton = styled.button`
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

export default SignUpSuccess;
