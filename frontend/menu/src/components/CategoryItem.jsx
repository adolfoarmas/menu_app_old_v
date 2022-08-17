import React from "react";

const CategoryItem = ({ category }) => {

    return (
        <button className="dish-category">
        <div>
            <h3>{ category }</h3>
        </div>
        </button>
    )
}

export default CategoryItem;