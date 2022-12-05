import React, {useState, useEffect, useContext} from "react";
import CategoryItem from '../components/CategoryItem'
import NewDish from "./NewDish";
import NewDishCategory from "./NewDishCategory"
import getDishCategories from "../services/dishCategory/getDishCategories";
import ModalHook, {useModal} from '../hooks/modalHook';
import { Context } from "../context/userContext"


const DishList = () => {

    const {token, csfrToken} = useContext(Context)
    const [tokenValue, setTokenValue] = token

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

    return (
        <div>
            <ModalHook modalHook={newDishHook} content={<NewDish />}/>  
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