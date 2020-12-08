import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addConceptToBook } from "../../../redux/actions/PostConnectionActions";

const ConceptsContainerComponent = ({ indexBook }) => {
  const postConnection = useSelector((state) => state.postConnection);
  const dispatch = useDispatch();
  console.log(postConnection);

  return (
    <>
      <ConceptsContainer>
        {typeof postConnection.status === "started"
          ? postConnection.post_connection.content.map((contentObj, index) => {
              console.log("Loop");
              return (
                <ConceptItem>
                  <ConceptTitle>Title</ConceptTitle>
                  <ConceptTitleInput
                    onChange={(e) => {
                      dispatch(
                        addConceptToBook({
                          fieldToChange: "title",
                          indexBook: indexBook,
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                  <ConceptDescription>Description</ConceptDescription>
                  <ConceptDescriptionInput />
                </ConceptItem>
              );
            })
          : null}
      </ConceptsContainer>
    </>
  );
};

const ConceptsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConceptItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConceptTitle = styled.h3``;
const ConceptTitleInput = styled.input``;

const ConceptDescription = styled.h4``;
const ConceptDescriptionInput = styled.input``;

export default ConceptsContainerComponent;
