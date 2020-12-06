import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleStepPostConnection } from "../../redux/actions/PostConnectionActions";
import { useHistory } from "react-router-dom";

const PreviousButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(toggleStepPostConnection(-1));
          history.push("/connect");
        }}
      >
        <PreviousIcon />
      </Button>
    </>
  );
};

const Button = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
`;

const PreviousIcon = styled(FiArrowLeft)`
  height: 50px;
  width: 50px;
`;

export default PreviousButton;
