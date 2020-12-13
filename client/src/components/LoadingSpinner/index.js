import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants";

const LoadingSpinner = () => {
  return (
    <>
      <Wrapper>
        <Loader></Loader>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100vw;
`;

const SpinAnimation = keyframes`
    0%{ transform: rotate(0deg); }
    100%{ transform: rotate(360deg); }
    `;

const Loader = styled.div`
  border: 7px solid #f3f3f3;
  border-radius: 50%;
  border-top: 7px solid ${COLORS.blue};
  width: 70px;
  height: 70px;
  -webkit-animation: spin 1s cubic-bezier(0.56, 0.76, 0.87, 0.5) infinite; /* Safari */
  animation: ${SpinAnimation} 0.5s cubic-bezier(0.56, 0.76, 0.87, 0.5) infinite;
`;

export default LoadingSpinner;
