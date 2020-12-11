import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleStepPostConnection } from "../../redux/actions/PostConnectionActions";
import { useHistory } from "react-router-dom";

const PreviousButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postConnection = useSelector((state) => state.postConnection);
  return (
    <>
      <Button
        onClick={() => {
          if (postConnection.step === 1) {
            dispatch(toggleStepPostConnection(-1));
          } else {
            history.push("/connect");
          }
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
