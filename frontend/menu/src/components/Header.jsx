import React, { useContext } from "react";
//import Logo from '../istockphoto-981368726-170667a.jpg';
import logoutUser from "../services/logoutUser.js"
//import UserLogin from "../pages/UserLogin";
import { Context } from "../context/userContext"

const Header = () => {

    const {token, csfrToken} = useContext(Context)

    const [tokenValue, setTokenValue] = token
    const [csfrTokenValue, setCsfrTokenValue] = csfrToken

    function handleLogout(e) {
        e.preventDefault()

        logoutUser(tokenValue)
        .then((data) =>{ 
            if(!data.error){
                setTokenValue(null)
                setCsfrTokenValue(null)
            }
        })

    }

    return (

        <div className="App-header">
            <div className="App-header-title" >
                {/* <img className="App-header-logo" src={Logo} alt="Logo" /> */}
                <h2>Restaurant Name</h2>
                <a className="App-header-logout App-link" hidden={!tokenValue} onClick={ e => handleLogout(e) } href="/">Log out</a>
            </div>
        </div>
    )
}

export default Header;
                                                                                                                                                    