import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  startPostConnection,
  toggleStepPostConnection,
} from "../../redux/actions/PostConnectionActions";
import SearchBar from "../SearchBar/index";
import { COLORS } from "../../constants";

import BooksChosenListComponent from "../BooksChosenList/index";
import ChooseConnectOption from "../ChooseConnectOption";
import PreviousButton from "../PostConnection/PreviousButton";
import { useSpring, animated } from "react-spring";

const PostConnection = () => {
  const dispatch = useDispatch();
  const postConnection = useSelector((state) => state.postConnection);
  const stepState = postConnection.step;
  useEffect(() => {
    dispatch(startPostConnection());
  }, []);

  const animation = useSpring({
    transform: "translate3D(0,0,0)",
    opacity: 1,
    from: {
      transform: "translate3D(0,-50px,0)",
      opacity: 0,
    },
  });

  //Sections Components
  const ChooseBooksSection = styled(animated.div)`
    display: ${stepState === 0 ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
  `;

  const ChooseOptionSection = styled(animated.div)`
    display: ${stepState === 1 ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
  `;

  const PreviousButtonContainer = styled.div`
    display: ${stepState === 0 ? "none" : "flex"};
    width: 80vw; ;
  `;

  return (
    <>
      <MainContainer>
        <PreviousButtonContainer>
          <PreviousButton />
        </PreviousButtonContainer>
        <ChooseBooksSection style={animation}>
          <Title>Choose 2 or more books:</Title>
          <SearchBar />
          <BooksChosenListComponent postConnection={postConnection} />
          <ButtonNext
            onClick={() => {
              dispatch(toggleStepPostConnection(1));
              localStorage.setItem(
                "post-connection",
                JSON.stringify(postConnection)
              );
            }}
          >
            Next
          </ButtonNext>
        </ChooseBooksSection>
        <ChooseOptionSection style={animation}>
          <Title>Choose to follow a structure, or be totally free:</Title>
          <ChooseConnectOption />
        </ChooseOptionSection>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0px 50px 0px;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-weight: 100;
  text-align: center;
`;

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

export default PostConnection;
