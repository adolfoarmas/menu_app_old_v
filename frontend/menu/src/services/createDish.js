


const handleErrors = (response) => {
    if(!response.ok){
        return {'error':response.statusText}
    }
    return response
}

export default async function createDish(payload){
    return fetch('api/dishes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token 3d8116de8862ea82947004034839d7b87c6eab09`
        },
        body: JSON.stringify(payload)
    })
    .then(handleErrors)
    .then(data => data.json())
}