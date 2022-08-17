// import React, {useState, useEffect} from "react";


// const CategoryDropDown = () => {



//     let [categories, setCategories] = useState([])
    

//     useEffect(()=> {
//         getCategories()
//     }, [])

//     let handleChange = (e) => {
//         setCategories
//     }

//     let getCategories = async () => {
//         let response = await fetch('/api/categories/')
//         let data = await response.json()
//         setCategories(data)
        
//     }


//     return (
//         <select value={this.state.value} onChange={this.handleChange}>
//             {categories.map((categorie, index) =>
//                 <option key={index} value={categorie.id}>{categorie.name}</option>

//             )}
//         </select>
//     )
// }

// export default CategoryDropDown;