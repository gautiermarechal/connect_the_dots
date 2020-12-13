import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncAddFinalLink,
  asyncCreateFinalLink,
  asyncModifyConceptToBook,
} from "../../../../redux/actions/PostConnectionActions";
import { v4 as uuidv4 } from "uuid";
import { COLORS } from "../../../../constants";

const Link = ({ concept, bookTitle }) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(uuidv4());
  const postConnection = useSelector(
    (state) => state.postConnection.post_connection
  );

  const [displayLink, setDisplayLink] = useState();
  useEffect(() => {
    if (concept.links.length === 0) {
      setDisplayLink(false);
    } else {
      setDisplayLink(true);
    }
  }, []);

  return (
    <>
      {displayLink ? (
        <LinkContainer>
          <LinkConceptsContainer>
            <ParentConceptContainer>
              <BookInfoContainer>
                <BookTitle>{bookTitle}</BookTitle>
              </BookInfoContainer>
              <LinkInfoContainer>
                <ConceptNumber>{concept._id + 1}</ConceptNumber>
                {concept.title}
              </LinkInfoContainer>
            </ParentConceptContainer>
            {concept.links.length !== 0 ? (
              concept.links.map((link) => {
                return (
                  <ChildrenConceptContainer>
                    <BookInfoContainer>
                      <BookTitle>
                        {postConnection.books.length !== 0 &&
                          postConnection.books.filter(
                            (book) => book.id === link._bookId
                          )[0].volumeInfo.title}
                      </BookTitle>
                    </BookInfoContainer>
                    <LinkInfoContainer>
                      <ConceptNumber>{link._id + 1}</ConceptNumber>
                      {link.title}
                    </LinkInfoContainer>
                  </ChildrenConceptContainer>
                );
              })
            ) : (
              <span>...</span>
            )}
          </LinkConceptsContainer>
          <LinkInput
            placeholder="Describe the link"
            onChange={(e) => {
              dispatch(asyncCreateFinalLink({ _id: currentId }));
              dispatch(
                asyncAddFinalLink({
                  _id: currentId,
                  parentConcept: concept,
                  childrenConcepts: concept.links,
                  content: e.target.value,
                })
              );
            }}
          />
        </LinkContainer>
      ) : null}
    </>
  );
};

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  width: 70vw;
  justify-content: center;
`;
const LinkConceptsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ParentConceptContainer = styled.div`
  background-color: ${COLORS.white};
  padding: 20px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  width: 50%;
  margin: 20px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  flex-direction: column;
`;

const ChildrenConceptContainer = styled.div`
  background-color: ${COLORS.white};
  padding: 20px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  width: 50%;
  margin: 20px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  flex-direction: column;
`;

const LinkInput = styled.textarea`
  margin: 20px;
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
const ConceptNumber = styled.span`
  width: 20px;
  text-align: center;
  border-radius: 7px;
  font-size: 30px;
  margin-right: 20px;
`;

const BookTitle = styled.div``;

const LinkInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const BookInfoContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 12px;
  justify-content: flex-end;
  color: grey;
`;

export default Link;
