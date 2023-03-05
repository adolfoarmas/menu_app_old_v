import styled from 'styled-components';
import React, { useContext } from "react";
import Logo from '../istockphoto-981368726-170667a.jpg';
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
        <CategoryWrapper>
            <Image   className="App-header-logo" src={Logo} alt="Logo" />
            <RestaurantName>Restaurant Name</RestaurantName>
            <LogOutLink className="App-header-logout App-link" hidden={!tokenValue} onClick={ e => handleLogout(e) } href="/">Log out</LogOutLink>
        </CategoryWrapper>
    )
}

export default Header;

let CategoryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items:center;
    background-color: #538dd4;
`
const Image = styled.img`
    height: 100%;
    width: 20%;
    padding: 0.5em;
    border-radius: 10em;
    box-sizing: border-box;
    align-self: center;
    flex-grow: 0;
`
let RestaurantName = styled.h1`
    height: 100%;
    width: 70%;
    box-sizing: border-box;
    align-self: center;
    flex-grow: 0;    
`

let LogOutLink = styled.a`
    height: 100%;
    width: 10%;
    box-sizing: border-box;
    align-self: center;
    flex-grow: 0;
    color: #000000;
    :hover {
        color: #fff;
    }
`