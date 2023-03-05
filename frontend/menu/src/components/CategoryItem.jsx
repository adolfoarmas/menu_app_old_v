import styled from 'styled-components';
import React, {useState, useEffect, useContext} from "react";
import getDishes from "../services/dish/getDish";
import NewDishCategory from "../pages/NewDishCategory";
import ListItem from "./ListItem";
import ModalHook, {useModal} from '../hooks/modalHook';
import deleteDishCategory from '../services/dishCategory/deleteDishCategory.js';
import { Context } from "../context/userContext";

const CategoryItem = ({ category }) => {

    const {token, csfrToken} = useContext(Context)
    const [tokenValue, ] = token
    const [csfrTokenValue, ] = csfrToken

    const [categoryProp, setCategoryProp] = useState(category)
    const [dishesVisible, setDishesVisible] = useState(false)
    const [dishes, setDishes] = useState([]) 


    const editDishCategoryHook = useModal('Dish Category')

    const editDishCategoryModal = () =>{
        editDishCategoryHook.changeShow()
    }

    const deleteDishCategoryModal = () => {
        deleteDishCategory(category.id,tokenValue ,csfrTokenValue)
    }

    const getDishesService = async (cat) => {
        const dish = await getDishes(cat)
        setDishes(dish)
    }
       
    useEffect(()=> {
            getDishesService(categoryProp)
        
    }, [categoryProp])
    
    return (
        <>
            <CategoryWrapper>
                <CategoryButton className="dish-category" onClick={() => setDishesVisible(!dishesVisible)}>
                    {category.name }
                </CategoryButton>
                <EditButton className="" hidden={!tokenValue} onClick={editDishCategoryModal}>Edit</EditButton>
                <DeleteButton className="" hidden={!tokenValue} onClick={deleteDishCategoryModal}>Delete</DeleteButton>
            </CategoryWrapper>
            <DishWrappre>
                {dishes && dishes.map((dish, id) => (
                        <ListItem key={id} visible={dishesVisible} dish={dish} />
                ))}  
                
                <ModalHook modalHook={editDishCategoryHook} content={<NewDishCategory category={ category } />} />
            </DishWrappre>
        </>
    )
}

export default CategoryItem;

let DishWrappre = styled.div`
    
`

let CategoryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
`

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
`

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
`

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
`