import React, {useState, useContext} from "react"
import createDishCategory from '../services/dishCategory/createDishCategory.js'
import editDishCategory from '../services/dishCategory/editDishCategory.js'
import { Context } from "../context/userContext"
import { useEffect } from "react"
import {USERS_END_POINT} from '../services/settings'

const NewDishCategory = (props) => {

    const {token, csfrToken, userLoggedId} = useContext(Context)
    const [tokenValue, setTokenValue] = token
    const [csfrTokenValue, setCsfrTokenValue] = csfrToken
    const [userLoggedIdValue, setUserLoggedData] = userLoggedId

    const [errorText, setErrorText] = useState();
    const [dishCategoryName, setDishCategoryName] = useState("");
    const [dishCategoryDescription, setdishCategoryDescription] = useState("");


    useEffect(()=>{

        const handleEdit = (category) => {
            if (category && dishCategoryName === "" && dishCategoryDescription === ""){
                setDishCategoryName(category.name)
                setdishCategoryDescription(category.description)
            }

        }

        handleEdit(props.category)

    })    
    
    const handleSubmit = async e => {

        e.preventDefault();

        const payload = {
            'name':dishCategoryName,
            'description':dishCategoryDescription,
            'created_by': USERS_END_POINT + userLoggedIdValue
            }
            
        if(props.category){
            const dishCategoryId = props.category.id
            return editDishCategory(payload, dishCategoryId, tokenValue, csfrTokenValue)
                    .then((data) => {
                        if (data.error){
                            return setErrorText(data.error)
                        }  
                    })
        }
        
        return createDishCategory(payload, tokenValue, csfrTokenValue,)
                .then((data) => {
                    if (data.error){
                        return setErrorText(data.error)
                    }  
                })
    }

   return (
        <div className="new-dish-form">
            <form className="new-dish-form-form" onSubmit={handleSubmit}>
            <h2>Add New Dish</h2>  
                <label>
                    <p>Name:</p>
                    <input type="text" value={dishCategoryName} onChange={e => setDishCategoryName(e.target.value)} />
                </label>
                <label>
                    <p>Description:</p>
                    <textarea maxLength={200} className="App-text-form-description" value={dishCategoryDescription} onChange={e => setdishCategoryDescription(e.target.value)}/>
                </label>
                <p> { errorText }</p>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default NewDishCategory