import {USER_LOGOUT_END_POINT} from "./settings.js"

const handleErrors = (response) => {
    if(!response.ok){
        return {'error': response.statusText}
    }
    return response
}

export default async function loginUser(){
    return fetch(USER_LOGOUT_END_POINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
    .then(handleErrors)
    .then(data => data.json())
    .then(window.localStorage.removeItem('logedUserMenuApp'))
}