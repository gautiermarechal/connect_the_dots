import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Footer = () => {
  return (
    <>
      <MainContainer></MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  height: 100px;
  width: 100%;
  background-color: ${COLORS.lightGreen};
`;

export default Footer;
