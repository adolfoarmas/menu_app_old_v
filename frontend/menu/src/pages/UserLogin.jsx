import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import loginUser from "../services/loginUser.js"
import getUserData from "../services/user/getUserData"
import { Context } from "../context/userContext"
import { ButtonNormal, FormDiv, FormFieldNameLabel } from "../styles/css.jsx";

const UserLogin = () => {

    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorText, setErrorText] = useState("")

    const {token, csfrToken, userLoggedId} = useContext(Context)

    const [tokenValue, setTokenValue] = token
    // const [csfrTokenValue, setCsfrTokenValue] = csfrToken
    const [userLoggedIdValue, setUserLoggedData] = userLoggedId
    
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
            window.localStorage.setItem('logedUserToken', data.key)
            setTokenValue(data.key)
            getUserData(username)
            .then(data => {
                let logedUserId = ""
                for(let i = 0; i <= data.length; i++) {
                    let ApiUsername = data[i]['username']
                    if(username.toLowerCase() ===  ApiUsername.toLowerCase()){
                        logedUserId = data[i]['id']
                        window.localStorage.setItem('logedUserId', logedUserId)
                        break
                    }
                }
                setUserLoggedData(data[0])
            })
        })
    }

    return (           
            <FormDiv>
                <form className="login-form-form" onSubmit={handleSubmit}>
                    <h2>User Login</h2>
                    <FormFieldNameLabel>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </FormFieldNameLabel>
                    <FormFieldNameLabel>
                        <p>Password</p>
                        <input type="password"  onChange={e => setPassword(e.target.value)}/>
                    </FormFieldNameLabel>
                    <p> { errorText }</p>
                    <div>
                        <ButtonNormal type="submit">Login</ButtonNormal>
                    </div>
                </form>
                {tokenValue && <Navigate to="/" replace={true} />}
            </FormDiv>
    )
}

export default UserLogin;



