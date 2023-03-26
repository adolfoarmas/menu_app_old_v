import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import loginUser from "../services/loginUser.js"
import getUserData from "../services/user/getUserData"
import { Context } from "../context/userContext"
import { ButtonLogin, FormFieldNameLabel, FormLogin, FormLoginDiv, LoginButtonGroupDiv } from "../styles/css.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const UserLogin = () => {

    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorText, setErrorText] = useState("")

    const {token, csfrToken, userLoggedId, userLoggedName} = useContext(Context)

    const [csfrTokenValue, setCsfrTokenValue] = csfrToken
    const [tokenValue, setTokenValue] = token
    const [userLoggedIdValue, setUserLoggedValue] = userLoggedId
    const [userLoggedNameValue, setUserLoggedNameValue] =userLoggedName
    
    const getCsrfToken = () => {
        return document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];
    }

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
                // let logedUserId = ""
                for(let i = 0; i <= data.length; i++) {
                    const ApiUsername = data[i]['username']
                    if(username.toLowerCase() ===  ApiUsername.toLowerCase()){
                        const logedUserId = data[i]['id']
                        const logedserName = data[i]['username']
                        window.localStorage.setItem('logedUserId', logedUserId)
                        window.localStorage.setItem("logedUserName", logedserName)
                        setCsfrTokenValue(getCsrfToken())
                        setUserLoggedValue(data[i]['id'])
                        setUserLoggedNameValue(data[i]['username'])
                        break
                    }
                }
                setUserName(null);
                setPassword(null)
            })
        })
    }



    return (           
            <FormLoginDiv>
                <FontAwesomeIcon icon={faCircleUser} /> 
                <h2>User Login</h2>
                <FormLogin className="login-form-form" onSubmit={e => handleSubmit(e)}>
                    <FormFieldNameLabel>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </FormFieldNameLabel>
                    <FormFieldNameLabel>
                        <p>Password</p>
                        <input type="password"  onChange={e => setPassword(e.target.value)}/>
                    </FormFieldNameLabel>
                    <p> { errorText }</p>
                    <LoginButtonGroupDiv>
                        <ButtonLogin type="submit">Login</ButtonLogin>
                        <a href="/"><FontAwesomeIcon icon={faLockOpen} /> Go to see the menu</a>
                    </LoginButtonGroupDiv>
                </FormLogin>
                {tokenValue && <Navigate to="/" replace={true} />}
            </FormLoginDiv>
    )
}

export default UserLogin;



