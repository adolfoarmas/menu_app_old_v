import React, {useState, useEffect, useContext} from "react";
import CategoryItem from '../components/CategoryItem'
import NewDish from "./NewDish";
import NewDishCategory from "./NewDishCategory"
import getDishCategories from "../services/dishCategory/getDishCategories";
import ModalHook, {useModal} from '../hooks/modalHook';
import { Context } from "../context/userContext"
import createDish from "../services/dish/createDish";


const DishList = () => {

    const {token, csfrToken} = useContext(Context)
    const [tokenValue, setTokenValue] = token
    const [csfrTokenValue, setCsfrToken] = csfrToken

    const newDishHook = useModal('Dish')
    const newDishCategoryHook = useModal('Dish Category')
    
    let [categories, setCategories] = useState([])
    
    const newDishModal = () =>{  
        newDishHook.changeShow()
      } 
    
    const newDishCategoryModal = () =>{  
        newDishCategoryHook.changeShow()
    } 

    const dishCategories = async () => {
        const categoriesService = await getDishCategories();
        setCategories(categoriesService)
    }
      

    useEffect(()=> {
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
        payload.append('price',formData.price)
        payload.append('currency',formData.currency)
        payload.append('created_by', JSON.parse(window.localStorage.getItem('logedUserId')))

        createDish(payload, tokenValue, csfrTokenValue);
    }

    return (
        <div>
            <ModalHook modalHook={newDishHook} content={<NewDish onSubmit={onSubmit} />}/>  
            <ModalHook modalHook={newDishCategoryHook} content={<NewDishCategory />}/>

            <button hidden={!tokenValue} onClick={newDishModal}>+ Add Dish</button>
            <button hidden={!tokenValue} onClick={newDishCategoryModal}>+ New Dish Category</button>

            <div className="dish-list">
                {
                <div>
                    {categories.map((category, index) => (   
                        <CategoryItem key={index} category={category} />
                    ))}
                </div>
                }
            </div>
        </div>
    )
}


export default DishList;