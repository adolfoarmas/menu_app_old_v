import React, {useEffect, useState, useContext} from "react";
import ModalHook, {useModal} from '../hooks/modalHook';
import NewDish from "../pages/NewDish";
import { Context } from "../context/userContext";

function showAdditional(element) {
    const alertInformation = Object.entries(element)
      .map(information => `${information[0]}: ${information[1]}`)
      .join('\n');
    alert(alertInformation)
  };

const ListItem = ( props ) => {

    const {token, csfrToken} = useContext(Context)
    const [tokenValue, ] = token
    const [csfrTokenValue, ] = csfrToken

    let [dish, setDish] = useState({})

    const editDishCategoryHook = useModal('Dish Category')

    const editDishCategoryModal = () =>{
        editDishCategoryHook.changeShow()
    }

    useEffect(()=>{
        setDish(props.dish)
    },[])


    if (props.visible && dish){
        
        return (
            
            <div className="dish-element">
                <ModalHook modalHook={editDishCategoryHook} content={<NewDish dish={ dish } />} />

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
