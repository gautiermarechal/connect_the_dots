import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  asyncAddLinkToConcept,
  asyncModifyConceptToBook,
  asyncModifyLink,
} from "../../../../redux/actions/PostConnectionActions";
import { GrAddCircle } from "react-icons/gr";
import { COLORS } from "../../../../constants";

const ConceptItemComponent = ({ indexBook, indexConcept, postConnection }) => {
  const dispatch = useDispatch();
  const [openTooltip, setOpenTooltip] = useState(false);
  const bookId = useSelector(
    (state) =>
      state.postConnection.post_connection.content[indexBook] &&
      state.postConnection.post_connection.content[indexBook].book.id
  );

  const LinksTooltip = styled.div`
    margin-top: 10px;
    display: ${openTooltip ? "flex" : "none"};
    background-color: ${COLORS.white};
    align-items: center;
    border-radius: 7px;
    padding: 20px;
    min-width: 100px;
    min-height: 100px;
  `;

  return (
    <ConceptItemContainer>
      {bookId ? (
        <>
          <NumberContainer>
            <ConceptNumber>{indexConcept + 1}</ConceptNumber>
          </NumberContainer>
          <ConceptItem>
            <ConceptTitleInput
              placeholder="Concept Title"
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
                dispatch(
                  asyncModifyLink({
                    fieldToChange: "title",
                    indexBook: indexBook,
                    indexConcept: indexConcept,
                    value: e.target.value,
                    indexLink: indexConcept,
                    bookId: bookId,
                  })
                );
              }}
            />
            <ConceptDescriptionInput
              placeholder="Concept Description"
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
                dispatch(
                  asyncModifyLink({
                    fieldToChange: "description",
                    indexBook: indexBook,
                    indexConcept: indexConcept,
                    value: e.target.value,
                    indexLink: indexConcept,
                    bookId: bookId,
                  })
                );
              }}
            />
            <DisplayLinksChosen>
              {postConnection.post_connection.content[indexBook].concepts[
                indexConcept
              ].links.map((linkChosen) => {
                return (
                  <LinkChosen>
                    <LinksChosenBook>{linkChosen.book}</LinksChosenBook>
                    <LinksChosenTitle>
                      <ConceptNumberList>
                        {linkChosen._id + 1}
                      </ConceptNumberList>
                      {linkChosen.title}
                    </LinksChosenTitle>
                  </LinkChosen>
                );
              })}
            </DisplayLinksChosen>
            <AddLinkButton
              onClick={() =>
                openTooltip ? setOpenTooltip(false) : setOpenTooltip(true)
              }
            >
              Add Link
            </AddLinkButton>
            <LinksTooltip>
              <LinksList>
                {postConnection.post_connection.content.map(
                  (contentObj, index) => {
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
                                          conceptObj: concept,
                                        })
                                      );
                                      setOpenTooltip(false);
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
                  }
                )}
              </LinksList>
            </LinksTooltip>
          </ConceptItem>
        </>
      ) : null}
    </ConceptItemContainer>
  );
};

const NumberContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ConceptNumber = styled.span`
  width: 20px;
  text-align: center;
  border-radius: 7px;
  font-size: 30px;
`;

const ConceptNumberList = styled.span`
  font-size: 30px;
  margin-right: 20px;
`;

const ConceptItemContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  width: 400px;
  justify-content: center;
`;

const ConceptItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
`;

const ConceptTitle = styled.h3``;
const ConceptTitleInput = styled.input`
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  height: 30px;
  border-color: #d3d7d7;
  padding: 10px;
  &::-webkit-input-placeholder {
  }
`;

const ConceptDescription = styled.h4``;
const ConceptDescriptionInput = styled.textarea`
  margin-top: 20px;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  height: 100px;
  border-color: #d3d7d7;
  font-family: "Merriweather Sans", sans-serif;
  padding: 10px;
  &::-webkit-input-placeholder {
    font-family: "Merriweather Sans", sans-serif;
  }
`;

const AddLinkButton = styled.button`
  margin-top: 20px;
  border: none;
  background-color: #f6f8f9;
  border-radius: 7px;
  color: grey;
  width: 100px;
  position: relative;
  height: 40px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: grey;
    color: white;
  }
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
  padding-right: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 7px;
  background-color: white;
  display: flex;
  align-items: center;
  white-space: normal;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const DisplayLinksChosen = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinksChosenContainerTitle = styled.h4``;
const LinksChosenTitle = styled.h5``;
const LinksChosenBook = styled.h6``;

const LinkChosen = styled.span``;

export default ConceptItemComponent;
