import styled from 'styled-components';
import React, { useState, useEffect, useContext } from "react";
import CategoryItem from '../components/CategoryItem'
import NewDish from "./NewDish";
import NewDishCategory from "./NewDishCategory"
import getDishCategories from "../services/dishCategory/getDishCategories";
import ModalHook, { useModal } from '../hooks/modalHook';
import { Context } from "../context/userContext"
import createDish from "../services/dish/createDish";


const DishList = () => {

    const { token, csfrToken } = useContext(Context)
    const [tokenValue, setTokenValue] = token
    const [csfrTokenValue, setCsfrToken] = csfrToken

    const newDishHook = useModal('Dish')
    const newDishCategoryHook = useModal('Dish Category')

    let [categories, setCategories] = useState([])

    const newDishModal = () => {
        newDishHook.changeShow()
    }

    const newDishCategoryModal = () => {
        newDishCategoryHook.changeShow()
    }

    const dishCategories = async () => {
        const categoriesService = await getDishCategories();
        console.log(categoriesService)
        setCategories(categoriesService)
    }

    useEffect(() => {
        dishCategories();
    }, [])

    const onSubmit = (formData) => {
        console.log(formData)
        let payload = new FormData()

        payload.append('name', formData.name)
        payload.append('description', formData.description)
        payload.append('category', JSON.parse(formData.category))
        payload.append('observation', formData.observation)
        payload.append('image', formData.image)
        payload.append('price', formData.price)
        payload.append('currency', formData.currency)
        payload.append('created_by', JSON.parse(window.localStorage.getItem('logedUserId')))

        createDish(payload, tokenValue, csfrTokenValue);
    }

    return (
        <ContentWrapper>
            <ToolBarWrapper>
                <ModalHook modalHook={newDishHook} content={<NewDish onSubmit={onSubmit} />} />
                <ModalHook modalHook={newDishCategoryHook} content={<NewDishCategory />} />
                <ToolBarButton hidden={!tokenValue} onClick={newDishModal}>+ Add Dish</ToolBarButton>
                <ToolBarButton hidden={!tokenValue} onClick={newDishCategoryModal}>+ New Dish Category</ToolBarButton>
            </ToolBarWrapper>
            <CategoiesDiv>
                {categories.map((category, index) => (
                    <CategoryItem key={index} category={category} />
                ))}
            </CategoiesDiv>
        </ContentWrapper>
    )
}


export default DishList;

let CategorieDiv = styled.div`
    
`

let CategoiesDiv = styled.div`
    
`
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
`
let ToolBarWrapper = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 1em 0em;
`
let ContentWrapper = styled.div`
    padding: 0em 0em;
    display: block;
    margin-left: inherit;
    margin-right: inherit;
    background-color: #a3c5dc;
`