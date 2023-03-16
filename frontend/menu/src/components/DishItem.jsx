import styled from "styled-components";
import React, { useEffect, useState, useContext } from "react";
import ModalHook, { useModal } from "../hooks/modalHook";
import NewDish from "../pages/forms/DishForm";
import { Context } from "../context/userContext";
import editDish from "../services/dish/editDish";
import deleteDish from "../services/dish/deleteDish.js";

const DishItem = (props) => {
  const { token, csfrToken } = useContext(Context);

  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  let [dish, setDish] = useState({});

  const editDishHook = useModal("Dish");

  const editDishCategoryModal = () => {
    editDishHook.changeShow();
  };

  const onDeleteDish = () => {
    deleteDish(dish.id, tokenValue, csfrTokenValue);
  };

  useEffect(() => {
    setDish(props.dish);
  }, []);

  const onSubmit = (formData) => {
    let payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("category", JSON.parse(formData.category));
    payload.append("observation", formData.observation);
    if (typeof formData.image != "string") {
      payload.append("image", formData.image);
    }
    payload.append("price", formData.price);
    payload.append("currency", formData.currency);
    payload.append(
      "created_by",
      JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    editDish(payload, formData.id, tokenValue, csfrTokenValue).then(() => {
      setDish(formData);
    });
  };

  if (props.visible && dish) {
    return (
      <DishWrapper>
        <ModalHook
          modalHook={editDishHook}
          content={<NewDish data={dish} onSubmit={onSubmit} />}
        />
        <Image src={dish.image} alt={dish.name} />
        <NameDescriptionWrapper>
          <h3>{dish.name}</h3>
          <p>
            <em>{dish.description}</em>
          </p>
        </NameDescriptionWrapper>
        <PriceCurrencyWrapper>
          <p>
            {dish.currency} {dish.price}
          </p>
        </PriceCurrencyWrapper>
        <EditButton hidden={!tokenValue} onClick={editDishCategoryModal}>
          Edit
        </EditButton>
        <DeleteButton hidden={!tokenValue} onClick={onDeleteDish}>
          Delete
        </DeleteButton>
      </DishWrapper>
    );
  }
};

export default DishItem;

const DishWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  p {
    margin: 0;
  }
`;
const Image = styled.img`
  height: 100%;
  width: 15%;
  padding: 0.5em;
  border-radius: 3em;
  box-sizing: border-box;
  align-self: center;
`;
const NameDescriptionWrapper = styled.div`
  height: 100%;
  width: 55%;
  box-sizing: border-box;
  align-self: center;
`;
const PriceCurrencyWrapper = styled.div`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
`;

const EditButton = styled.button`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
  color: white;
  background-color: #325891;
  border-style: none;
  border-radius: 0.3em;
  border: none;
  :hover {
    background-color: #3865ad;
    cursor: pointer;
  }
`;
const DeleteButton = styled.button`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
  color: white;
  background-color: #325891;
  border-style: none;
  border-radius: 0.3em;
  border: none;
  :hover {
    background-color: #a24b4b;
    cursor: pointer;
  }
`;