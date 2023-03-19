import styled from 'styled-components';
import React, { useContext } from "react";
import Logo from '../b36cde191e387823d890215d9d552c27.jpg';
import logoutUser from "../services/logoutUser.js"
//import UserLogin from "../pages/UserLogin";
import { Context } from "../context/userContext"
import {HeadderWrapper,RestaurantName,ButtonNormal, ImageDiv, ButtonPanelDiv, ButtonWarn} from "../styles/css"

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
        <HeadderWrapper>
            <ImageDiv>
                <img src={Logo} alt="Logo" />
            </ImageDiv>
            <RestaurantName>Restaurant Name</RestaurantName>
            <ButtonPanelDiv>
                <ButtonNormal hidden={!tokenValue} onClick={ e => handleLogout(e) } href="/">Log out</ButtonNormal>
                <ButtonWarn>Ejemplo</ButtonWarn>
            </ButtonPanelDiv>

        </HeadderWrapper>
    )
}

export default Header;