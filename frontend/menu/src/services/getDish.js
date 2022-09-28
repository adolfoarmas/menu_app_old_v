import {DISHES_END_POINT} from "./settings.js"

const handleErrors = async (response) => {
    let resp = await response
    if(!resp.ok){
        const errorMessage = {'error': resp.statusText}
        return errorMessage
    }   
}


export default async function getDish(category){
    //console.log(category, "url from service")
    return await fetch( DISHES_END_POINT + "?category=" + String(category.id)).then(async resp => {
            const data = await resp.json()
            return await data
    })
}