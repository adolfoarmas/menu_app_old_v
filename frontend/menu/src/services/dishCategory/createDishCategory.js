import {DISH_CATEGORIES_END_POINT} from '../settings.js'


const handleErrors = (response) => {
    if(!response.ok){
        return {'error':response.statusText}
    }
    return response
}

export default async function createDishCategory(payload, token, csfrToken,){
    return fetch(DISH_CATEGORIES_END_POINT, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
        body: payload
    })
    .then(handleErrors)
    .then(data => {
            return data.json()
    })
}