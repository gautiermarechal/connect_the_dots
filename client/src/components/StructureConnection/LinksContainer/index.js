import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  asyncAddFinalLink,
  asyncModifyConceptToBook,
} from "../../../redux/actions/PostConnectionActions";
import { v4 as uuidv4 } from "uuid";

const LinksContainerComponent = ({ postConnection }) => {
  const dispatch = useDispatch();
  return (
    <>
      <LinksContainer>
        <Title>Links</Title>
        {postConnection.post_connection.content.map((contentObj) => {
          return contentObj.concepts.map((concept) => {
            return (
              <LinkContainer>
                <LinkConceptsContainer>
                  <ParentConceptContainer>
                    {concept.title}
                  </ParentConceptContainer>
                  {concept.links.length !== 0 ? (
                    concept.links.map((link) => {
                      return (
                        <ChildrenConceptContainer>
                          {link.title}
                        </ChildrenConceptContainer>
                      );
                    })
                  ) : (
                    <span>...</span>
                  )}
                </LinkConceptsContainer>
                <LinkInput
                  onChange={(e) => {
                    dispatch(
                      asyncAddFinalLink({
                        _id: uuidv4(),
                        parentConcept: concept,
                        childrenConcepts: concept.links,
                        content: e.target.value,
                      })
                    );
                  }}
                />
              </LinkContainer>
            );
          });
        })}
      </LinksContainer>
    </>
  );
};

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-items: center;
`;

const LinkConceptsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParentConceptContainer = styled.div``;

const ChildrenConceptContainer = styled.div``;

const Title = styled.h1``;

const LinkInput = styled.input``;

export default LinksContainerComponent;
