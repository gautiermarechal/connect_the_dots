import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addConceptToBook,
  asyncAddConceptToBook,
  asyncCreateFinalLink,
  modifyConceptToBook,
} from "../../../redux/actions/PostConnectionActions";
import { GrAddCircle } from "react-icons/gr";
import ConceptItemComponent from "./ConceptItem";

const ConceptsContainerComponent = ({ indexBook, postConnection }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ConceptsContainer>
        {postConnection.post_connection.content
          ? postConnection.post_connection.content[indexBook].concepts.map(
              (contentObj, indexConcept) => {
                return (
                  <ConceptItemComponent
                    indexBook={indexBook}
                    indexConcept={indexConcept}
                    postConnection={postConnection}
                  />
                );
              }
            )
          : null}
        <AddConceptButton
          onClick={(e) => {
            dispatch(
              asyncAddConceptToBook({
                indexBook: indexBook,
              })
            );
          }}
        >
          Add Concept
        </AddConceptButton>
      </ConceptsContainer>
    </>
  );
};

const ConceptsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddConceptButton = styled.button`
  margin-top: 20px;
  border: none;
  border-radius: 7px;
  color: white;
  width: 100px;
  position: relative;
  height: 40px;
  cursor: pointer;
  transition: 0.5s;
  background-color: #28a745;

  &:hover {
    background-color: grey;
    color: white;
  }
`;

const AddIcon = styled(GrAddCircle)``;

export default ConceptsContainerComponent;
