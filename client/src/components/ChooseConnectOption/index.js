import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";
import {
  asyncInitialiseContentFreePostConnection,
  asyncInitialiseContentStructurePostConnection,
  setTypePostConnection,
  toggleStepPostConnection,
} from "../../redux/actions/PostConnectionActions";
import { useSpring, animated } from "react-spring";

const ChooseConnectOption = () => {
  const dispatch = useDispatch();
  const currentType = useSelector((state) => state.postConnection.type);
  const history = useHistory();
  const postConnection = useSelector((state) => state.postConnection);

  const animation = useSpring({
    transform:
      postConnection.step === 1
        ? "translate3D(0,0,0)"
        : "translate3D(0,-50px,0)",
    opacity: postConnection.step === 1 ? 1 : 0,
  });

  return (
    <>
      <Wrapper style={animation}>
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
            if (currentType === "structure") {
              dispatch(
                asyncInitialiseContentStructurePostConnection({
                  content: postConnection.post_connection.books.map((book) => ({
                    book: book,
                    concepts: [
                      { _id: 0, title: "", description: "", links: [] },
                    ],
                  })),
                })
              );
            } else {
              dispatch(asyncInitialiseContentFreePostConnection());
            }
            dispatch(toggleStepPostConnection(1));
            history.push(`/connect/${currentType}`);
          }}
        >
          Next
        </ButtonNext>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(animated.div)`
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

const VisibleCheck = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 1px;
  background-color: ${(props) => (props.filled ? COLORS.blue : "white")};
  border-color: ${COLORS.blue};
  cursor: pointer;
`;

const ChoiceLabel = styled.label``;

const ButtonNext = styled.div`
  background-color: ${COLORS.blue};
  border-style: none;
  border-radius: 7px;
  color: white;
  padding: 5px;
  width: 200px;
  margin: 2px;
  height: 50px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  &:hover {
    background-color: ${COLORS.darkBlue};
  }
`;

export default ChooseConnectOption;
