import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  asyncAddLinkToConcept,
  asyncModifyConceptToBook,
} from "../../../../redux/actions/PostConnectionActions";
import { GrAddCircle } from "react-icons/gr";
import { COLORS } from "../../../../constants";

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
        <NumberContainer>
          <ConceptNumber>{indexConcept + 1}</ConceptNumber>
        </NumberContainer>
        <ConceptTitle>Title</ConceptTitle>
        <ConceptTitleInput
          value={
            postConnection.post_connection.content[indexBook].concepts[
              indexConcept
            ].title
          }
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
          value={
            postConnection.post_connection.content[indexBook].concepts[
              indexConcept
            ].description
          }
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
                      if (concept.title === "") {
                        return null;
                      } else {
                        return (
                          <LinkItem
                            onClick={() => {
                              dispatch(
                                asyncAddLinkToConcept({
                                  indexBook: indexBook,
                                  indexConcept: indexConcept,
                                  book: contentObj.book.id,
                                })
                              );
                            }}
                          >
                            <ConceptNumberList>
                              {concept._id + 1}
                            </ConceptNumberList>
                            {concept.title}
                          </LinkItem>
                        );
                      }
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

const NumberContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ConceptNumber = styled.span`
  width: 50%;
  background-color: ${COLORS.green};
  text-align: center;
  color: white;
  border-radius: 7px;
`;

const ConceptNumberList = styled.span`
  width: 50%;
  background-color: ${COLORS.green};
  text-align: center;
  color: white;
  border-radius: 7px;
  margin-right: 10px;
`;

const ConceptItemContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
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
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

export default ConceptItemComponent;
