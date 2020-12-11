import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {
  asyncAddFinalLink,
  asyncCreateFinalLink,
  asyncModifyConceptToBook,
} from "../../../../redux/actions/PostConnectionActions";
import { v4 as uuidv4 } from "uuid";

const Link = ({ concept }) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(uuidv4());

  return (
    <LinkContainer>
      <LinkConceptsContainer>
        <ParentConceptContainer>{concept.title}</ParentConceptContainer>
        {concept.links.length !== 0 ? (
          concept.links.map((link) => {
            return (
              <ChildrenConceptContainer>{link.title}</ChildrenConceptContainer>
            );
          })
        ) : (
          <span>...</span>
        )}
      </LinkConceptsContainer>
      <LinkInput
        onChange={(e) => {
          console.log(currentId);
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
  );
};
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

const LinkInput = styled.input``;

export default Link;
