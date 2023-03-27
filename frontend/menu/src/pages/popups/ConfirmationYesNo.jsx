import styled from "styled-components";
import React, { useState, useContext } from "react";

import { Context } from "../../context/userContext";
import { useEffect } from "react";
import { ButtonNormal, ButtonWarn } from "../../styles/css";

const ConfirmationYesNo = ({message, onConfirmation}) => {
    //const { token, csfrToken, userLoggedId } = useContext(Context);

  useEffect(() => {
    
  });

  const handleConfirmation = async (event, confirmation) => {
    event.preventDefault();
    onConfirmation(confirmation);
  };
  
  return (
    <FormDiv >
        <div>  
            <p>{message}</p>
        </div>
            <ButtonWarn onClick={(e) => handleConfirmation(e, true)} type="submit">Yes</ButtonWarn>
        
            <ButtonNormal onClick={(e) => handleConfirmation(e, false)} type="reset">No</ButtonNormal>
¡    </FormDiv>
  );
};

export default ConfirmationYesNo;

const ButtonDiv = styled.div`
  button {
    margin: 0;
    align-self: center;
    color: white;
    background-color: #325891;
    padding: 0.5em 1.3em;
    margin: 1em 0em;
    border-style: none;
    border-radius: 0.3em;
    border: none;
    font-size: 1rem;
    height: auto;
    :hover {
      background-color: #3865ad;
      cursor: pointer;
    }
  }
`;


const FormDiv = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: inherit;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;

