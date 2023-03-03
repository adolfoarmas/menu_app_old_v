import React, {useEffect, useState, useContext} from "react";
import ModalHook, {useModal} from '../hooks/modalHook';
import NewDish from "../pages/NewDish";
import { Context } from "../context/userContext";
import editDish from "../services/dish/editDish";

function showAdditional(element) {
    const alertInformation = Object.entries(element)
      .map(information => `${information[0]}: ${information[1]}`)
      .join('\n');
    alert(alertInformation)
  };

const ListItem = ( props ) => {

    const {token, csfrToken} = useContext(Context)
    const [tokenValue, setTokenValue] = token
    const [csfrTokenValue, setCsfrTokenValue] = csfrToken

    let [dish, setDish] = useState({})

    const editDishCategoryHook = useModal('Dish Category')

    const editDishCategoryModal = () =>{
        editDishCategoryHook.changeShow()
    }

    useEffect(()=>{
        setDish(props.dish)
    },[])

    const onSubmit = (formData) => {

        console.log(formData)
        
        let payload = new FormData()
        
        payload.append('name', formData.name)
        payload.append('description', formData.description)
        payload.append('category', JSON.parse(formData.category))
        payload.append('observation', formData.observation)
        if(typeof(formData.image) != "string"){
            payload.append('image', formData.image)
        }
        payload.append('price',formData.price)
        payload.append('currency',formData.currency)
        payload.append('created_by', JSON.parse(window.localStorage.getItem('logedUserId')))
        

        editDish(payload, formData.id, tokenValue, csfrTokenValue)

    }


    if (props.visible && dish){
        
        return (
            
            <div className="dish-element">
                <ModalHook modalHook={editDishCategoryHook} content={<NewDish data={ dish } onSubmit={ onSubmit } />} />

                    <img src={dish.image} alt= {dish.name}  />
                    <div className="dish-title-description">
                        <h3>{dish.name}</h3>
                        <p><em>{dish.description}</em></p>
                    </div>
                    <div className="dish-price">
                        <p>{dish.currency}  {dish.price}</p>
                    </div>
                    <button onClick={() => showAdditional(dish)}>More Info</button>
                    <button className="" hidden={!tokenValue} onClick={editDishCategoryModal}>edit</button>
            </div>
            
            // <button className="" hidden={!tokenValue} onClick={deleteDishCategoryModal}>delete</button>
        )
    }
}

export default ListItem;
