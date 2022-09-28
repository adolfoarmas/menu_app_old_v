import {USER_LOGIN_END_POINT} from "./settings.js"

const handleErrors = (response) => {
    if(!response.ok){
        return {'error': response.statusText}
    }
    return response
}

export default async function loginUser(credentials){
    return fetch(USER_LOGIN_END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(handleErrors)
    .then(data => {
        if(!data.error){
            return data.json()
        }
        return data
        })
}