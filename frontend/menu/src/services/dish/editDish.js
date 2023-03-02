import {DISHES_END_POINT} from '../settings.js'

const handleErrors = (response) => {
    if(!response.ok){
        return {'error':response.statusText}
    }
    return response
}

export default async function editDish(payload, dishId, token, csfrToken){
    console.log(payload)
    return fetch(DISHES_END_POINT + dishId + '/', {
        method: 'PUT',
        headers: {
            //'Content-Type': 'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken
        },
        body: payload
    })
    .then(handleErrors)
    .then(data => data.json())
}