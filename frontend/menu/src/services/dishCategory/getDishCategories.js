import {DISH_CATEGORIES} from "../settings.js"

const handleErrors = (response) => {
    if(!response.ok){
        const errorMessage = {'error': response.statusText}
        return errorMessage
    }
    return response
}

export default async function getDishCategories(){
    const respuesta =  await fetch(DISH_CATEGORIES)
    const json = await respuesta.json()
    return await json
}
