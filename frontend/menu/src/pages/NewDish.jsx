import React, {useState, useEffect} from "react";
import UserLogin from "./UserLogin";
import getDishCategories from "../services/getDishCategories";

const NewDish = (token) => {


    const [categoriesList, setCategoriesList] = useState([])
    const [errorText, setErrorText] = useState();
    const [dishName, setDishName] = useState();
    const [dishDescription, setdishDescription] = useState();
    const [dishCategory, setdishCategory] = useState();
    const [dishObservation, setdishObservation] = useState();
    const [dishImage, setdishImage] = useState();
    const [dishPrice, setdishPrice] = useState();
    const [dishCurrency, setdishCurrency] = useState();

    useEffect(()=> {
        getDishCategories()
        .then(categories => setCategoriesList(categories))
    }, [])

    const handleErrors = (response) => {
        if(!response.ok){
            return setErrorText(response.statusText)
        }
        return response
    }

    const imageToBase64 = (files) => {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
     
            reader.onload = (e) => {
                setdishImage(e.target.result)
            }
     
            }


    async function CreateDish(dishData) {
        return fetch('api/dishes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token 3d8116de8862ea82947004034839d7b87c6eab09`
            },
            body: JSON.stringify(dishData)
        })
        .then(handleErrors)
        .then(data => data.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        CreateDish({
        'name':dishName,
        'description':dishDescription,
        'category': JSON.parse(dishCategory),
        'observation':dishObservation,
        'image':dishImage,
        'price':dishPrice,
        'currency':dishCurrency,
        'created_by': JSON.parse(window.localStorage.getItem('logedUserMenuApp'))['user']
        });
    }

    return (
        <div className="new-dish-form">
            <form className="new-dish-form-form" onSubmit={handleSubmit}>
            <h2>Add New Dish</h2>  
                <label>
                    <p>Name:</p>
                    <input type="text" onChange={e => setDishName(e.target.value)} />
                </label>
                <label>
                    <p>Description:</p>
                    <textarea maxLength={200} className="App-text-form-description" onChange={e => setdishDescription(e.target.value)}/>
                </label>
                <label>
                    <p>Category:</p>
                    <select onChange={e => setdishCategory((e.target.value))}>
                    {categoriesList.map((categorie, index) =>
                        <>console.log(categorie)
                       <option key={index} value={categorie}>{categorie.name}</option>
                       </>)}
                </select>
                </label>
                <label>
                    <p>Observation:</p>
                    <textarea onChange={e => setdishObservation(e.target.value || '')}/>
                </label>
                <label className="new-dish-form-form-picture">
                    <p className="new-dish-form-form-picture-title">Picture:</p>
                    <input type="file" src={dishImage} onChange={e => imageToBase64(e.target.files)}/>
                    <img src={dishImage} />
                </label>
                <div className="new-dish-form-form-price">
                <label>
                    <p>Price:</p>
                    <input className="new-dish-form-form-price-price" type="text" onChange={e => setdishPrice(e.target.value)}/>
                </label>
                <label>
                    <p>Currency:</p>
                    <input className="new-dish-form-form-price-currency" type="text" defaultValue={'USD'} onChange={e => setdishCurrency(e.target.value || 'USD')}/>
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


