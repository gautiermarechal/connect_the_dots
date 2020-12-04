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
import WriteConnection from "../WriteConnection";
import PreviousButton from "../PostConnection/PreviousButton";

const PostConnection = () => {
  const dispatch = useDispatch();
  const postConnection = useSelector((state) => state.postConnection);
  const stepState = postConnection.step;
  useEffect(() => {
    dispatch(startPostConnection());
  }, []);

  //Sections Components
  const ChooseBooksSection = styled.div`
    display: ${stepState === 0 ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
  `;

  const ChooseOptionSection = styled.div`
    display: ${stepState === 1 ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
  `;

  const WriteConnectionSection = styled.div`
    display: ${stepState === 2 ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
  `;

  const PreviousButtonContainer = styled.div`
    display: ${stepState === 0 ? "none" : "flex"};
    width: 100%;
  `;

  return (
    <>
      <MainContainer>
        <PreviousButtonContainer>
          <PreviousButton />
        </PreviousButtonContainer>
        <ChooseBooksSection>
          <Title>Choose 2 or more books:</Title>
          <SearchBar />
          <BooksChosenListComponent postConnection={postConnection} />
          <ButtonNext onClick={() => dispatch(toggleStepPostConnection(1))}>
            Next
          </ButtonNext>
        </ChooseBooksSection>
        <ChooseOptionSection>
          <Title>Choose to follow a structure, or be totally free:</Title>
          <ChooseConnectOption />
        </ChooseOptionSection>
        <WriteConnectionSection>
          <WriteConnection />
        </WriteConnectionSection>
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

export default PostConnection;
