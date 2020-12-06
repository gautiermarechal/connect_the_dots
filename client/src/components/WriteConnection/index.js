import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FreeConnection from "../FreeConnection";

const WriteConnection = () => {
  const postConnection = useSelector((state) => state.postConnection);
  return (
    <>
      <MainContainer>
        {/* `{postConnection.type === "free" ? (
          <FreeConnection />
        ) : (
          <Structure></Structure>
        )}` */}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div``;

const Structure = styled.div``;

export default WriteConnection;
