import React, {useState, useEffect} from "react";
import CategoryItem from '../components/CategoryItem'
import ListItem from '../components/ListItem'


const DishList = () => {


    let category = ''
    
    let [categories, setCategories] = useState([])
    

    useEffect(()=> {
        getCategories()
    }, [])

    let getCategories = async () => {

        let response = await fetch('/api/categories/')
        let data = await response.json()
        setCategories(data)
        
    }   


    return (
        <div>
            <div className="dish-list">
                {
                <div>
                    {categories.map((category, index) => (
                        
                        <>
                        {<CategoryItem key={index} category={category.name} />}
                        {console.log(category.dishes)}
                        {category.dishes.map((dish, index)=>(
                            <ListItem key={index} dish={dish} />
                        ))}
                        </>
                        
                        
                    ))}
                </div>
                }
            </div>
        </div>
    )
}


export default DishList;