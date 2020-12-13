import React, { useState } from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

const PublishedModal = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const MainContainer = styled.div`
    display: ${open ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    right: 0;
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: white;
    border-radius: 7px;
    margin: 20px;
  `;
  return (
    <>
      <MainContainer>
        <CloseButtonContainer>
          <CloseModalButton onClick={handleClose}>
            <IoIosClose />
          </CloseModalButton>
        </CloseButtonContainer>
      </MainContainer>
    </>
  );
};

const PublishedTitle = styled.h3`
  margin: 30px;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 0;
`;

const CloseModalButton = styled.button`
  background-color: transparent;
  border: none;
  margin-top: 10px;
  cursor: pointer;
`;

export default PublishedModal;
