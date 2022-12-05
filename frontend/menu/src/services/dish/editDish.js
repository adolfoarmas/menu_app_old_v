import {DISHES_END_POINT} from '../settings.js'


const handleErrors = (response) => {
    if(!response.ok){
        return {'error':response.statusText}
    }
    return response
}

export default async function createDishCategory(payload, dishId, token, csfrToken,){
    return fetch(DISHES_END_POINT + dishId + '/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
        body: JSON.stringify(payload)
    })
    .then(handleErrors)
    .then(data => {
        if(!data.error){
            return data.json()
        }
        return data
        })
}