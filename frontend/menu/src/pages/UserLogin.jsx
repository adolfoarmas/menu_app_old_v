import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

const UserLogin = ({setToken}) => {


    useEffect(() => {

    const logedUserMenuApp = window.localStorage.getItem('logedUserMenuApp')
    if (logedUserMenuApp) {
        const user = JSON.parse(logedUserMenuApp)
    }

    }, [])

    const handleErrors = (response) => {
        if(!response.ok){
            return setErrorText("Please check username o password, the combination you provided does not match")
        }
        return response
    }
    

    async function LoginUser(credentials) {
        return fetch('api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(handleErrors)
        .then(data => data.json())
    }
    
    
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState(null);
    //const [token, setToken] = useState();
    const [errorText, setErrorText] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        const user = await LoginUser({
            username,
            password
        });

        window.localStorage.setItem(
            'logedUserMenuApp', JSON.stringify(user)
        )

        setUser(user)
        setUserName('')
        setPassword('')


        setToken(user.token);
    }

    return (
        <div className="login-form">
            <form className="login-form-form" onSubmit={handleSubmit}>
                <label>
                    <h2>User Login</h2>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password"  onChange={e => setPassword(e.target.value)}/>
                </label>
                <p> { errorText }</p>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            {user && <Navigate to="/newDish" replace={true} />}
        </div>
        
)
}

export default UserLogin;

// UserLogin.protoTypes = {
//     setToken: PropTypes.func.isRequired
// }


