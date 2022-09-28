import React, { useState, useEffect, useContext } from "react";
import Logo from '../istockphoto-981368726-170667a.jpg';
import logoutUser from "../services/logoutUser.js"
import { Navigate } from "react-router-dom";
//import UserLogin from "../pages/UserLogin";
import { Context, UserContextProvider } from "../context/userContext"

const Header = () => {

    const [userLogged, setUserLogged] = useContext(Context)
    const hiddeLogoutButton = userLogged ? false : true

    // const [userLogged, setUserLogged] = useState(window.localStorage.getItem('logedUserMenuApp') ? false : true)

    // useEffect(() => {
    //     const logedUserMenuApp = window.localStorage.getItem('logedUserMenuApp')
    //     //console.log(userLogged)
    //     if (logedUserMenuApp) {
    //         setUserLogged(false)
    //     }
    // }, [])

    return (

        <div className="App-header">
            <div className="App-header-title" >
                {/* <img className="App-header-logo" src={Logo} alt="Logo" /> */}
                <h2>Restaurant Name</h2>
                <a className="App-header-logout App-link" hidden={!userLogged} onClick={logoutUser} href="/login">Log out</a>
            </div>
        </div>
    )
}

export default Header;
                                                                                                                                                    