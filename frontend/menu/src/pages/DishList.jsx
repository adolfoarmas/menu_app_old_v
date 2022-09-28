import React, {useState, useEffect} from "react";
import CategoryItem from '../components/CategoryItem'
import ListItem from '../components/ListItem'
import getDishCategories from "../services/getDishCategories";

const DishList = () => {
    
    let [categories, setCategories] = useState([])

    

    useEffect(()=> {

        getDishCategories()
        .then(categories => setCategories(categories))
        
    }, [])

    return (
        <div>
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