import React, { useContext } from "react";
import Logo from '../b36cde191e387823d890215d9d552c27.jpg';
import logoutUser from "../services/logoutUser.js"
import { Context } from "../context/userContext"
import {HeadderWrapper,RestaurantName,ButtonNormal, ImageDiv, ButtonPanelDiv} from "../styles/css"
import BussinessInformationCard from "./BussinessInformationCard";

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
            <BussinessInformationCard />
            <ButtonPanelDiv>
                <ButtonNormal hidden={!tokenValue} onClick={ e => handleLogout(e) } href="/">Log out</ButtonNormal>
            </ButtonPanelDiv>

        </HeadderWrapper>
    )
}

export default Header;