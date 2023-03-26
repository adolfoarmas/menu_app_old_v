import styled from "styled-components";
import React, { useState, useContext } from "react";

import { Context } from "../../context/userContext";
import { useEffect } from "react";

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
        <ButtonDiv>
            <button onClick={(e) => handleConfirmation(e, true)} type="submit">Yes</button>
        </ButtonDiv>
        <ButtonDiv>
            <button onClick={(e) => handleConfirmation(e, false)} type="reset">No</button>
        </ButtonDiv>
    </FormDiv>
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

const FieldNameLabel = styled.label`
  display: flex;
  flex-direction: column;
  height: auto;
  p {
    margin: 0;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em;
  max-width: 80%;

  @media only screen and (min-width: 768px) {
    .FormDiv {
      flex-direction: row;
    }
  }

  .InputsDiv .ImageFormDiv {
    flex-basis: 100%;
    margin: 10px;
  }

  @media only screen and (min-width: 768px) {
    .InputsDiv .ImageFormDiv {
      flex-basis: 50%;
    }
  }
`;
