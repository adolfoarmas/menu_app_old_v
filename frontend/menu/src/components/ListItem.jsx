import React, {useState, useEffect} from "react";



function showAdditional(element) {
    const alertInformation = Object.entries(element)
      .map(information => `${information[0]}: ${information[1]}`)
      .join('\n');
    alert(alertInformation)
  };


const ListItem = ({ dish }) => {

    return (
    <div className="dish-element">

        
            <img src={dish.image} alt= {dish.name}  />
            <div className="dish-title-description">
                <h3>{dish.name}</h3>
                <p><em>{dish.description}</em></p>
            </div>
            <div className="dish-price">
                <p>{dish.currency}  {dish.price}</p>
            </div>
            <button onClick={() => showAdditional(dish)}>More Info</button>
        </div>
    )
}

export default ListItem;
