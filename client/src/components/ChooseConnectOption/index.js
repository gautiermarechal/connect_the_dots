import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { toggleStepPostConnection } from "../../redux/actions/PostConnectionActions";

const ChooseConnectOption = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Wrapper>
        <MainContainer>
          <ChoiceContainer>
            <ChoiceButton
              type="radio"
              id="structure"
              value="structure"
              name="choice"
            />
            <ChoiceLabel htmlFor="structure">
              <h2>Follow our structure</h2>
            </ChoiceLabel>
          </ChoiceContainer>
          <ChoiceContainer>
            <ChoiceButton type="radio" id="free" name="choice" />
            <ChoiceLabel htmlFor="free" value="free">
              <h2>Be free</h2>
            </ChoiceLabel>
          </ChoiceContainer>
        </MainContainer>
        <ButtonNext onClick={() => dispatch(toggleStepPostConnection(1))}>
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
