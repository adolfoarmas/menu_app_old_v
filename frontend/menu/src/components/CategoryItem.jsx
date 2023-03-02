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
        <div>
        
        <button className="dish-category" onClick={() => setDishesVisible(!dishesVisible)}>
        <div>
            <h4>{ category.name }</h4>
        </div>
        </button>
        <button className="" hidden={!tokenValue} onClick={editDishCategoryModal}>edit</button>
        <button className="" hidden={!tokenValue} onClick={deleteDishCategoryModal}>delete</button>
          {dishes && dishes.map((dish, id) => (
           <ListItem key={id} visible={dishesVisible} dish={dish} />
          ))}  
        <ModalHook modalHook={editDishCategoryHook} content={<NewDishCategory category={ category } />} />
        </div>
        
        
        

    )
}

export default CategoryItem;