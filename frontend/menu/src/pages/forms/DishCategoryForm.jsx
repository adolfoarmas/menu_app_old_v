import styled from "styled-components";
import React, { useState, useContext } from "react";
import createDishCategory from "../../services/dishCategory/createDishCategory.js";
import editDishCategory from "../../services/dishCategory/editDishCategory.js";
import { Context } from "../../context/userContext";
import { useEffect } from "react";
import { USERS_END_POINT } from "../../services/settings";

const NewDishCategory = ({data={}, onSubmit}) => {
  const { token, csfrToken, userLoggedId } = useContext(Context);
  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;
  const [userLoggedIdValue] = userLoggedId;

  const [formData, setFormData] = useState(data);
  const [errorText, setErrorText] = useState();
  const [dishCategoryName, setDishCategoryName] = useState("");
  const [dishCategoryDescription, setdishCategoryDescription] = useState("");

  useEffect(() => {
    const handleEdit = (category) => {
      if (
        category &&
        dishCategoryName === "" &&
        dishCategoryDescription === ""
      ) {
        setDishCategoryName(category.name);
        setdishCategoryDescription(category.description);
      }
    };

    handleEdit(data.category);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <FormDiv >
      <Form onSubmit={handleSubmit}>
        {data.category ? (
          <h2>Edit Dish Category</h2>
        ) : (
          <h2>Add New Dish Category</h2>
        )}
        <FieldNameLabel>
          <p>Name:</p>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FieldNameLabel>
        <FieldNameLabel>
          <p>Description:</p>
          <textarea
            id="description"
            name="description"
            maxLength={200}
            value={formData.description}
            onChange={handleChange}
          />
        </FieldNameLabel>
        <p> {errorText}</p>
        <ButtonDiv>
          {data.category ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Create</button>
          )}
        </ButtonDiv>
      </Form>
    </FormDiv>
  );
};

export default NewDishCategory;

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