import {DISHES_END_POINT} from '../settings.js';

const handleErrors = (response) => {
    if(!response.ok){
        return {'error':response.statusText}
    }
    return response
}

export default async function createDish(payload, token, csfrToken,){
    console.log(payload, token, csfrToken)
    return fetch(DISHES_END_POINT, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data', //'application/json',
            'Authorization': `Token` + token, 
            'X-CSRFToken':  csfrToken,
        },
        body: payload
    })
    .then(handleErrors)
    .then(data => {
        console.log(data)
        data.json()
    })

}