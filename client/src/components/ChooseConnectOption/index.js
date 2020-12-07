import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";
import {
  setTypePostConnection,
  toggleStepPostConnection,
} from "../../redux/actions/PostConnectionActions";

const ChooseConnectOption = () => {
  const dispatch = useDispatch();
  const currentType = useSelector((state) => state.postConnection.type);
  const history = useHistory();
  const postConnection = useSelector((state) => state.postConnection);

  return (
    <>
      <Wrapper>
        <MainContainer>
          <ChoiceContainer>
            <VisibleCheck
              onClick={() => {
                if (currentType === "free") {
                  dispatch(setTypePostConnection("structure"));
                }
              }}
              filled={currentType === "structure" ? true : false}
            />
            <ChoiceLabel>Follow our structure</ChoiceLabel>
          </ChoiceContainer>
          <ChoiceContainer>
            <VisibleCheck
              onClick={() => {
                if (currentType === "structure") {
                  dispatch(setTypePostConnection("free"));
                }
              }}
              filled={currentType === "free" ? true : false}
            />
            <ChoiceLabel>Be free</ChoiceLabel>
          </ChoiceContainer>
        </MainContainer>
        <ButtonNext
          onClick={() => {
            history.push(`/connect/${currentType}`);
            dispatch(toggleStepPostConnection(1));
            localStorage.setItem(
              "post-connection",
              JSON.stringify(postConnection)
            );
          }}
        >
          Next
        </ButtonNext>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 50px;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChoiceButton = styled.input``;

const VisibleCheck = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 1px;
  background-color: ${(props) => (props.filled ? COLORS.green : "white")};
  border-color: ${COLORS.green};
`;

const ChoiceLabel = styled.label``;

const ButtonNext = styled.div`
  background-color: ${COLORS.green};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 100;
  text-align: center;
`;

export default ChooseConnectOption;