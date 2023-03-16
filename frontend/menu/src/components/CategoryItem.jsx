import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import getDishes from "../services/dish/getDish";
import DishCategoryForm from "../pages/forms/DishCategoryForm";
import DishItem from "./DishItem";
import ModalHook, { useModal } from "../hooks/modalHook";
import deleteDishCategory from "../services/dishCategory/deleteDishCategory.js";
import { CategoriesContext, Context } from "../context/userContext";
import editDishCategory from "../services/dishCategory/editDishCategory";

const CategoryItem = ({ data }) => {
  const { token, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);

  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  const [dishesVisible, setDishesVisible] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState(data)

  const editDishCategoryHook = useModal("Dish Category");

  const onEditDishCategoryModal = () => {
    editDishCategoryHook.changeShow();
  };

  const onDeleteDishCategory = () => {
    deleteDishCategory(category.id, tokenValue, csfrTokenValue);
  };

  const getDishesService = async (cat) => {
    return await getDishes(cat).then((data) => setDishes(data));
  };

  useEffect(() => {
    getDishesService(category);
  }, [dishCategories]);

  //TO REFACTOR: Unify with onSubmitNewDishCategory in DishList.jsx page
  const onSubmit = (formData) => {
    console.log(formData)
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("created_by", JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    editDishCategory(payload, formData.id, tokenValue, csfrTokenValue)
    .then((data) => {
      const editedCategory = data;
      setCategory(editedCategory)
      const indexToEdit = dishCategories.indexOf(category)
      dishCategories.splice(indexToEdit, 1, editedCategory) //modifies existing array
      setDishCategories(dishCategories)
    });
  };

  return (
    <>
      <CategoryWrapper>
        <CategoryButton
          onClick={() => setDishesVisible(!dishesVisible)}
        >
          {category.name}
        </CategoryButton>
        <EditButton
          hidden={!tokenValue}
          onClick={onEditDishCategoryModal}
        >
          Edit
        </EditButton>
        <DeleteButton
          hidden={!tokenValue}
          onClick={onDeleteDishCategory}
        >
          Delete
        </DeleteButton>
      </CategoryWrapper>
      <DishWrappre>
        <ModalHook
          modalHook={editDishCategoryHook}
          content={<DishCategoryForm data={category} onSubmit={onSubmit} />}
        />
        {dishes &&
          dishes.map((dish, id) => (
            <DishItem key={id} visible={dishesVisible} dish={dish} />
          ))}
      </DishWrappre>
    </>
  );
};

export default CategoryItem;

let DishWrappre = styled.div``;
let CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;
let CategoryButton = styled.button`
  height: 100%;
  width: 80%;
  box-sizing: border-box;
  align-self: center;
  color: white;
  background-color: #325891;
  border-style: none;
  flex-grow: 0;
  /* padding: 0 1.3em;
    margin: 1em 0em; */
  /* border-radius: 0.3em; */
  border: none;
  /* font-size: 1rem; */
  :hover {
    background-color: #3865ad;
    cursor: pointer;
  }
`;
let EditButton = styled.button`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
  color: white;
  background-color: #325891;
  border-style: none;
  flex-grow: 0;
  /* padding: 0 1.3em;
    margin: 1em 0em; */
  /* border-radius: 0.3em; */
  border: none;
  /* font-size: 1rem; */
  :hover {
    background-color: #3865ad;
    cursor: pointer;
  }
`;
let DeleteButton = styled.button`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
  color: white;
  background-color: #325891;
  border-style: none;
  flex-grow: 0;
  /* padding: 0.5em 0.3em;
    margin: 1em 0em; */
  /* border-radius: 0.3em; */
  border-style: 0.5em solid;
  /* font-size: 1rem; */
  :hover {
    background-color: #a24b4b;
    cursor: pointer;
  }
`;
