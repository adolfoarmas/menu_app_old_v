import styled from "styled-components";
import React, { useEffect, useContext, Suspense } from "react";
import CategoryItem from "../components/CategoryItem";
import NewDish from "./forms/DishForm";
import NewDishCategory from "./forms/DishCategoryForm";
import ModalHook, { useModal } from "../hooks/modalHook";
import { CategoriesContext, Context, ToastVisibilityContext } from "../context/userContext";
import createDish from "../services/dish/createDish";
import createDishCategory from "../services/dishCategory/createDishCategory";
import ToastMessage from "../components/ToastMessage";

const DishList = () => {
  const { token, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);
  // const {toastVisible, setToastVisible} = useContext(ToastVisibilityContext)
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext)

  const [tokenValue] = token;
  const [csfrTokenValue] = csfrToken;

  const newDishHook = useModal("Dish");
  const newDishCategoryHook = useModal("Dish Category");

  const newDishModal = () => {
    newDishHook.changeShow();
  };

  const newDishCategoryModal = () => {
    newDishCategoryHook.changeShow();
  };

  const displayToast = (message, type) => {
    setToastMessage(message)
    setToastType(type)
    setToastVisible(true)
  }

  useEffect(() => {}, [dishCategories]);

  //TO REFACTOR: Unify with onSubmit in DishItem.jsx component
  const onSubmitNewDish = (formData) => {
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("category", JSON.parse(formData.category));
    payload.append("observation", formData.observation);
    payload.append("image", formData.image);
    payload.append("price", formData.price);
    payload.append("currency", formData.currency);
    payload.append(
      "created_by",
      JSON.parse(window.localStorage.getItem("logedUserId"))
    );

    createDish(payload, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then((data) => {
      const categoryId = data.category;
      const updatedCategories = dishCategories.map((category) =>
        category.id === categoryId ?
           {
              ...category,
              dishes: [...category.dishes, data.url],
            }
          : category
      );
      setDishCategories(updatedCategories);
      newDishModal()
      displayToast('Dish "' + String(data.name) + '" has been created!', 'success')
    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

 //TO REFACTOR: Unify with onSubmit in CategoryItem.jsx component
  const onSubmitNewDishCategory = (formData) => {
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("created_by", JSON.parse(window.localStorage.getItem("logedUserId"))
    );
    createDishCategory(payload, tokenValue, csfrTokenValue)
    .then(data => {
      // console.log(data)
      if(data.Error){
        throw data
      }
      return data
    })
    .then((data) => {
      // console.log(data)
      const newCategory = [data];
      setDishCategories([...dishCategories, ...newCategory]);
      newDishCategoryModal()
      displayToast('Category "' + String(data.name) + '" has been created!', 'success')
    })
    .catch(data => {
      displayToast(data, 'error')
    })
  };

  return (
    <ContentWrapper>
      <div>
      {/* <button onClick={handleClick}>Show Toast</button> */}
      {toastVisible && (
        <ToastMessage
          message={toastMessage}
          type={toastType}
          duration={3000}
        />
      )}
    </div>
      <ToolBarWrapper>
        <ModalHook
          modalHook={newDishHook}
          content={
            <NewDish
              onSubmit={onSubmitNewDish}
              dishCategories={dishCategories}
            />
          }
        />
        <ModalHook
          modalHook={newDishCategoryHook}
          content={<NewDishCategory onSubmit={onSubmitNewDishCategory}/>}
        />

        <ToolBarButton hidden={!tokenValue} onClick={newDishModal}>
          + Add Dish
        </ToolBarButton>
        <ToolBarButton hidden={!tokenValue} onClick={newDishCategoryModal}>
          + New Dish Category
        </ToolBarButton>
      </ToolBarWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoiesDiv>
          {dishCategories?.map((category, index) => (
            <>
              <CategoryItem key={index} data={category} />
            </>
          ))}
        </CategoiesDiv>
      </Suspense>
    </ContentWrapper>
  );
};

export default DishList;

let CategoiesDiv = styled.div``;
let ToolBarButton = styled.button`
  align-self: center;
  color: white;
  background-color: #325891;
  padding: 0.5em 1.3em;
  margin: 1em 1em;
  border-style: none;
  border-radius: 0.3em;
  border: none;
  font-size: 1rem;
  height: auto;
  :hover {
    background-color: #3865ad;
    cursor: pointer;
  }
`;
let ToolBarWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 1em 0em;
`;
let ContentWrapper = styled.div`
  padding: 0em 0em;
  display: block;
  margin-left: inherit;
  margin-right: inherit;
  background-color: #a3c5dc;
`;
