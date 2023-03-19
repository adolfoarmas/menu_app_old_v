import styled from "styled-components";

const backgroundColor = "#262626"

const boxesTextColor = "#000000"
const boxesBackgroundColor = "#c4c4c4"

const boxesShadow = "0 0.5rem 0.5rem 0.05rem #00000033"

const warnColor = "#a80303";

const buttonNormalBorder = "0.005rem solid" + boxesTextColor;
const buttonNormalHoverBorder = buttonNormalBorder
const buttonNormalBackgroundColor = boxesBackgroundColor
const buttonNormalColor = boxesTextColor;

const butonNormalHoverBackgroundColor = backgroundColor;
const butonNormalHoverColor = 'white';

const buttonWarnBorder = "0.005rem solid" + warnColor;
const buttonWarnHoverBorder = "0.005rem solid" + warnColor;
const buttonWarnBackgroundColor = boxesBackgroundColor;
const buttonWarnColor = warnColor

const buttonWarnHoverBackgroundColor = warnColor
const buttonWarnHoverColor = "#fff";


//---General---

export const ButtonNormal = styled.button`
    align-self: center;
    color: ${buttonNormalColor};
    background-color: ${buttonNormalBackgroundColor};
    padding: 0.5em 1em;
    margin: 0.5em;
    border: ${buttonNormalBorder};
    border-radius: 0.5em;
    font-size: 0.8rem;
    :hover {
        color: ${butonNormalHoverColor};
        background-color: ${butonNormalHoverBackgroundColor};
        border: ${buttonNormalHoverBorder};
        cursor: pointer;
    }
`;

export const ButtonWarn = styled(ButtonNormal)`
    color: ${buttonWarnColor};
    background-color: ${buttonWarnBackgroundColor};
    border: ${buttonWarnBorder};
    :hover {
        color: ${buttonWarnHoverColor};
        background-color: ${buttonWarnHoverBackgroundColor};
        border: ${buttonWarnHoverBorder};
        cursor: pointer;
    }
`;

//---Index---

export const IndexWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${backgroundColor};
  height: inherit;
`

//---App---

export const   AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
  height: 100vh;
  /* width: 70%; */
  /* align-items: center; */

  @media (max-width: 600px) 
   {
    flex-direction: column;
}`

//---Header---

export const HeadderWrapper = styled.header`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: baseline;
  background-color: ${boxesBackgroundColor};
  color: ${boxesTextColor};
  padding: 0 0.5rem 0.5rem 0.5rem;
  width: inherit;
  border-radius: 0em 0em 1em 1em;
  box-shadow: ${boxesShadow};
`

export const ImageDiv = styled.div`
    box-sizing:border-box;
    width: 20%;
    img {
        width:100%;
        border-radius: 0em 0em 1em 1em;
    }
    align-self: baseline;
`

export const RestaurantName = styled.h1`
    align-self: center;
    text-align: center;
    flex-grow: 1;    
`

export const ButtonPanelDiv = styled.div`
  display:flex;
  width: 20%;  
  padding: 0.5em;
  border-radius: 2em;
  align-self: center;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  `;
  
  //---ToolBar---
  
  export const ToolBarWrapper = styled.nav`
    padding: 0.5em 0.5em;
    display: block;
    border-radius: 0.5em;
    background-color: ${boxesBackgroundColor};
    box-shadow: ${boxesShadow};
  `;

//---DishList---

export const DishListContentWrapper = styled.div`
    padding: 0em 0em;
    display: block;
    flex: 1;
    margin-left: inherit;
    margin-right: inherit;
    background-color: ${boxesBackgroundColor};
    color: ${boxesTextColor};
    overflow-y: auto;
    border-radius: 1em 1em 0em 0em;
    box-shadow: ${boxesShadow};
`

//---Category---

export const DishListWrapper = styled.div``;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const CategoryButton = styled(ButtonNormal)`
  height: 100%;
  width: 80%;
  align-self: center;
`;

export const ButtonEditCategory = styled(ButtonNormal)`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
`;

export const ButtonDeleteCategory = styled(ButtonWarn)`
  height: 100%;
  width: 10%;
  align-self: center;
`;

//---Dish---

export const DishWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  /* border-radius: 1rem; */
  border-style: solid;
  border-width: 0 0 0.02rem 0;
  /* margin:0.5rem; */
  p {
    margin: 0;
  }
`;
export const DishImage = styled.img`
  height: 100%;
  width: 15%;
  padding: 0.5em;
  border-radius: 3em;
  box-sizing: border-box;
  align-self: center;
`;
export const DishDescriptionWrapper = styled.div`
  height: 100%;
  width: 55%;
  box-sizing: border-box;
  align-self: center;
`;
export const DishPriceCurrencyWrapper = styled.div`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
`;

export const DishEditButton = styled(ButtonNormal)`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
`;

export const DishDeleteButton = styled(ButtonWarn)`
  height: 100%;
  width: 10%;
  box-sizing: border-box;
  align-self: center;
`;
