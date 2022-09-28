import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import loginUser from "../services/loginUser.js"
import { Context, UserContextProvider } from "../context/userContext"

const UserLogin = () => {

    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    //const [token, setToken] = useState(null);
    const [errorText, setErrorText] = useState("")
    const [userLogged, setUserLogged] = useContext(Context)
    

    const handleSubmit = async e => {
        e.preventDefault();

        await loginUser({
            username,
            password
        })
        .then((data) => {
            if (data.error){
                return setErrorText(data.error)
            }
            window.localStorage.setItem('logedUserMenuApp', data.key)
            setUserLogged(data.key)
        })

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
            {userLogged && <Navigate to="/" replace={true} />}
        </div>
        
)
}

export default UserLogin;

// UserLogin.protoTypes = {
//     setToken: PropTypes.func.isRequired
// }


