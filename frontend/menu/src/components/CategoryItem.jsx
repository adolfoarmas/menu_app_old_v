import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import getDishes from "../services/dish/getDish";
import DishCategoryForm from "../pages/forms/DishCategoryForm";
import DishItem from "./DishItem";
import ModalHook, { useModal } from "../hooks/modalHook";
import deleteDishCategory from "../services/dishCategory/deleteDishCategory.js";
import { CategoriesContext, Context, ToastVisibilityContext, DishesContext } from "../context/userContext";
import editDishCategory from "../services/dishCategory/editDishCategory";
import ConfirmationYesNo from "../pages/popups/ConfirmationYesNo";

const CategoryItem = ({ data }) => {
  const { token, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);
  const [dishes, setDishes] = useState([]);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext)

  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  const [dishesVisible, setDishesVisible] = useState(false);
  // const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState(data)
  const [confirmationModalMessage, setConfirmationMessage] = useState('')

  const editDishCategoryModal = useModal("Dish Category");
  const confirmationModal = useModal("Confirm delete category");

  const onEditDishCategoryModal = () => {
    editDishCategoryModal.changeShow();
  };
  
  const onDeleteDishCategory = () => {
    setConfirmationMessage('Are you sure you want to delete the category?')
    confirmationModal.changeShow();
  } 

  const onConfirmation = (confirmation) => {
    confirmation ? onConfirmateDeleteDishCategory() : onDeleteDishCategory();
  }


  const onConfirmateDeleteDishCategory = () => {
    deleteDishCategory(category.id, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then(() => {
      const nameDeleted = category.name
      const indexToEdit = dishCategories.indexOf(category)
      dishCategories.splice(indexToEdit, 1) //modifies existing array
      setDishCategories(dishCategories)
      displayToast('Category "' + String(nameDeleted) + '" has been deleted!', 'success')
    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

  const getDishesService = async (cat) => {
    const apiDishes = await getDishes(cat)
    await setDishes(apiDishes)
  };

  const displayToast = (message, type) => {
    setToastMessage(message)
    setToastType(type)
    setToastVisible(true)
  }

  useEffect(() => {
    getDishesService(category);
  }, [dishCategories]);

  //TO REFACTOR: Unify with onSubmitNewDishCategory in DishList.jsx page
  const onSubmit = (formData) => {
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("created_by", JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    editDishCategory(payload, formData.id, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then((data) => {
      const editedCategory = data;
      setCategory(editedCategory)
      const indexToEdit = dishCategories.indexOf(category)
      dishCategories.splice(indexToEdit, 1, editedCategory) //modifies existing array
      setDishCategories(dishCategories)
      onEditDishCategoryModal()
      displayToast('Category "' + String(data.name) + '" has been edited!', 'success')
    })
    .catch(data => {
      displayToast(data, 'error')
    })
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
          modalHook={editDishCategoryModal}
          content={<DishCategoryForm data={category} onSubmit={onSubmit} />}
        />
        <ModalHook
          modalHook={confirmationModal}
          content={<ConfirmationYesNo message={confirmationModalMessage} onConfirmation={onConfirmation} />}
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
