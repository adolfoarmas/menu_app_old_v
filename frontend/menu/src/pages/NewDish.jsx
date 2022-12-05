import React, {useState, useEffect, useContext} from "react";
import useForm from 'react-hook-form'
import UserLogin from "./UserLogin";
import getDishCategories from "../services/dishCategory/getDishCategories";
import createDish from '../services/createDish.js'
import editDish from '../services/dish/editDish.js'
import {USERS_END_POINT} from '../services/settings'
import { Context } from "../context/userContext"

const NewDish = (props) => {

    // const {register, formState: { errors }, watch, handleSubmit } = useForm({
    //     defaultValues: {

    //     }
    // })


    const {token, csfrToken, userLoggedId} = useContext(Context)
    const [tokenValue, setTokenValue] = token
    const [csfrTokenValue, setCsfrTokenValue] = csfrToken
    const [userLoggedIdValue, setUserLoggedData] = userLoggedId
    const [categoriesList, setCategoriesList] = useState([])
    const [errorText, setErrorText] = useState();
    const [dishName, setDishName] = useState("");
    const [dishDescription, setdishDescription] = useState("");
    const [dishCategory, setdishCategory] = useState("");
    const [dishObservation, setdishObservation] = useState("");
    const [dishImage, setdishImage] = useState("");
    const [dishPrice, setdishPrice] = useState("");
    const [dishCurrency, setdishCurrency] = useState("");
    const dish = props['dish'] || null

    useEffect(()=> {

        getDishCategories()
        .then(categories => setCategoriesList(categories))
        .then((categories) => {
        if (dish && dishName === "" && dishDescription === "" && dishCategory  === "" && dishObservation === "" && dishImage === "" && dishPrice === "" && dishCurrency === "" ){
            setDishName(dish.name)
            setdishDescription(dish.description)
            console.log(categoriesList)
            setdishCategory(()=> {
                const cat = categoriesList.find(o => {
                    return o.id === dish['id']
            })
                console.log(cat)
                return cat
            })
            setdishObservation(dish.observation)
            setdishImage(dish.image)
            setdishPrice(dish.price)
            setdishCurrency(dish.currency)
        }
    })


    }, [props])

    const imageToBase64 = (files) => {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
     
            reader.onload = (e) => {
                setdishImage(e.target.result)
            }}


    const handleSubmit = async e => {

        e.preventDefault()

        const payload = {
            'name':dishName,
            'description':dishDescription,
            'category': JSON.parse(dishCategory),
            'observation':dishObservation,
            'image':dishImage,
            'price':dishPrice,
            'currency':dishCurrency,
            'created_by': USERS_END_POINT + userLoggedIdValue
        }

        console.log(props)

        if(props.dish){
            console.log(props.dish.id)
            const dishId = props.dish.id
            return editDish(payload, dishId, tokenValue, csfrTokenValue)
                    .then((data) => {
                        if (data.error){
                            return setErrorText(data.error)
                        }  
                    })
        }

        return createDish(payload, tokenValue ,csfrTokenValue)
            .then((data) => {
                if (data.error){
                    return setErrorText(data.error)
                }  
        });
    }

    return (
        <div className="new-dish-form">
            <form className="new-dish-form-form" onSubmit={handleSubmit}>
            <h2>Add New Dish</h2>  
                <label>
                    <p>Name:</p>
                    <input type="text" value={dishName} onChange={e => setDishName(e.target.value)} />
                </label>
                <label>
                    <p>Description:</p>
                    <textarea maxLength={200} className="App-text-form-description" value={dishDescription} onChange={e => setdishDescription(e.target.value)}/>
                </label>
                <label>
                    <p>Category:</p>
                    <select value={dishCategory} onChange={e => setdishCategory((e.target.value))}>
                    {categoriesList.map((categorie, index) =>
                        <>
                        {console.log(categorie)}
                       <option key={categorie.id} value={dishCategory || categorie}>{categorie.name}</option>
                       </>)}
                </select>
                </label>
                <label>
                    <p>Observation:</p>
                    <textarea value={dishObservation} onChange={e => setdishObservation(e.target.value || '')}/>
                </label>
                <label className="new-dish-form-form-picture">
                    <p className="new-dish-form-form-picture-title">Picture:</p>
                    <input type="file" src={dishImage} onChange={e => imageToBase64(e.target.files)}/>
                    <img src={dishImage} alt={dishDescription} />
                </label>
                <div className="new-dish-form-form-price">
                <label>
                    <p>Price:</p>
                    <input className="new-dish-form-form-price-price" type="text" value={dishPrice} onChange={e => setdishPrice(e.target.value)}/>
                </label>
                <label>
                    <p>Currency:</p>
                    <input className="new-dish-form-form-price-currency" type="text" defaultValue={'USD'} value={dishCurrency} onChange={e => setdishCurrency(e.target.value || 'USD')}/>
                </label>
                </div>
                <p> { errorText }</p>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
)
}

export default NewDish;


