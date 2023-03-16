import styled from "styled-components";
import React, { useEffect, useContext, Suspense } from "react";
import CategoryItem from "../components/CategoryItem";
import NewDish from "./forms/DishForm";
import NewDishCategory from "./forms/DishCategoryForm";
import ModalHook, { useModal } from "../hooks/modalHook";
import { CategoriesContext, Context } from "../context/userContext";
import createDish from "../services/dish/createDish";
import createDishCategory from "../services/dishCategory/createDishCategory";

const DishList = () => {
  const { token, csfrToken } = useContext(Context);
  const [dishCategories, setDishCategories] = useContext(CategoriesContext);

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

  useEffect(() => {}, [dishCategories]);

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

    createDish(payload, tokenValue, csfrTokenValue).then((data) => {
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
    });
  };

  const onSubmitNewDishCategory = (formData) => {
    console.log(formData)
    let payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("created_by", JSON.parse(window.localStorage.getItem("logedUserId"))
    );
    createDishCategory(payload, tokenValue, csfrTokenValue).then((data) => {
      console.log(data)
      const newCategory = [data];
      setDishCategories([...dishCategories, ...newCategory]);
    });
  };

  return (
    <ContentWrapper>
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
