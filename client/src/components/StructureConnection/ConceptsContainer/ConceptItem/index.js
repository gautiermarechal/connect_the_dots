import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addConceptToBook,
  asyncAddConceptToBook,
  asyncModifyConceptToBook,
  modifyConceptToBook,
} from "../../../../redux/actions/PostConnectionActions";
import { GrAddCircle } from "react-icons/gr";

const ConceptItemComponent = ({ indexBook, indexConcept, postConnection }) => {
  const dispatch = useDispatch();
  const [openTooltip, setOpenTooltip] = useState(false);

  const LinksTooltip = styled.div`
    position: absolute;
    display: ${openTooltip ? "flex" : "none"};
    background-color: whitesmoke;
    align-items: center;
    border-radius: 7px;
    padding: 20px;
    min-width: 100px;
    min-height: 100px;
  `;

  return (
    <ConceptItemContainer>
      <ConceptItem>
        <ConceptTitle>Title</ConceptTitle>

        <ConceptTitleInput
          onChange={(e) => {
            dispatch(
              asyncModifyConceptToBook({
                fieldToChange: "title",
                indexBook: indexBook,
                indexConcept: indexConcept,
                value: e.target.value,
              })
            );
          }}
        />
        <ConceptDescription>Description</ConceptDescription>
        <ConceptDescriptionInput
          onChange={(e) => {
            dispatch(
              asyncModifyConceptToBook({
                fieldToChange: "description",
                indexBook: indexBook,
                indexConcept: indexConcept,
                value: e.target.value,
              })
            );
          }}
        />
      </ConceptItem>
      <AddLinkButton
        onClick={() =>
          openTooltip ? setOpenTooltip(false) : setOpenTooltip(true)
        }
      >
        <AddIcon />
      </AddLinkButton>
      <LinksTooltip>
        <LinksList>
          {postConnection.post_connection.content.map((contentObj, index) => {
            if (index === indexBook) {
              return null;
            } else {
              return (
                <>
                  <LinkBook>
                    <h3>{contentObj.book.volumeInfo.title}</h3>
                  </LinkBook>
                  <LinkBookList>
                    {contentObj.concepts.map((concept) => {
                      return <LinkItem>{concept.title}</LinkItem>;
                    })}
                  </LinkBookList>
                </>
              );
            }
          })}
        </LinksList>
      </LinksTooltip>
    </ConceptItemContainer>
  );
};

const ConceptItemContainer = styled.div`
  display: flex;
`;

const ConceptItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConceptTitle = styled.h3``;
const ConceptTitleInput = styled.input``;

const ConceptDescription = styled.h4``;
const ConceptDescriptionInput = styled.input``;

const AddLinkButton = styled.button`
  margin-top: 20px;
  border: none;
  background-color: transparent;
  width: 100px;
  position: relative;
`;

const AddIcon = styled(GrAddCircle)``;

const LinksList = styled.ul``;

const LinkBook = styled.li`
  margin-bottom: 10px;
`;

const LinkBookList = styled.ol``;

const LinkItem = styled.li`
  margin-left: 10px;
  margin-bottom: 15px;
`;

export default ConceptItemComponent;
