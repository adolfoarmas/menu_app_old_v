import React, {useState, useEffect} from "react";
import getDish from "../services/getDish";
import ListItem from "./ListItem";

const CategoryItem = ({ category }) => {

    const [dishesVisible, setDishesVisible] = useState(false)
    let [dishes, setDishes] = useState([])

    useEffect(()=> {
        getDish(category)
        .then(async data =>{
            setDishes(data)
        })      
    }, [])

   
    
    
    // return <ListItem key={index.toString()} visible={dishesVisible} url={dish} />
    return (
        <div>
        <button className="dish-category" onClick={() => setDishesVisible(!dishesVisible)}>
        <div>
            <h3>{ category.name }</h3>
        </div>
        </button>
          {dishes && dishes.map((dish, id) => (
           <ListItem key={id} visible={dishesVisible} dish={dish} />
          ))}
        </div>
    )
}

export default CategoryItem;