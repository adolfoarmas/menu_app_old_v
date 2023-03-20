import styled, { keyframes } from "styled-components";

const backgroundColor = "#262626";

const boxesTextColor = "#000000";
const boxesBackgroundColor = "#c4c4c4";

const boxesShadow = "0 0.5rem 0.5rem 0.05rem #00000033";

const confirmColor = "#4c824c";
const warnColor = "#a80303";

const buttonNormalBorder = "0.005rem solid" + boxesTextColor;
const buttonNormalHoverBorder = buttonNormalBorder;
const buttonNormalBackgroundColor = boxesBackgroundColor;
const buttonNormalColor = boxesTextColor;

const butonNormalHoverBackgroundColor = backgroundColor;
const butonNormalHoverColor = "white";

const buttonWarnBorder = "0.005rem solid" + warnColor;
const buttonWarnHoverBorder = "0.005rem solid" + warnColor;
const buttonWarnBackgroundColor = boxesBackgroundColor;
const buttonWarnColor = warnColor;

const buttonWarnHoverBackgroundColor = warnColor;
const buttonWarnHoverColor = "#fff";

const dishHoverBackgroundColor = "#b1b1b1";

//---General---

export const ButtonNormal = styled.button`
  /* align-self: center; */
  display: inline-block;
  outline: none;
  color: ${buttonNormalColor};
  background-color: ${buttonNormalBackgroundColor};
  padding: 0.5em 1em;
  margin: 0.5em;
  border: ${buttonNormalBorder};
  border-radius: 0.5em;
  font-size: 0.8rem;
  box-shadow: 0px 0.2rem #363535;
  :hover {
    color: ${butonNormalHoverColor};
    background-color: ${butonNormalHoverBackgroundColor};
    border: ${buttonNormalHoverBorder};
    cursor: pointer;
  }
  :active{
    box-shadow: 0px 0px;
    transform: translateY(2px); //sinkable button
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

export const FormDiv = styled.div`
  margin: 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-self: center;
  border-radius: 1rem;
  width: 50%;
  background-color: ${boxesBackgroundColor};
`;

export const FormFieldNameLabel = styled.label` //Forms
  display: flex;
  flex-direction: column;
  height: auto;
  
  p {
    margin: 0;
  }
`;

export const FromErrorLabel = styled.label`
  font-size: 0.8em;
  color: #ff0000a2;
`;

//---Index---

export const IndexWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${backgroundColor};
  height: inherit;
`;

//---App---

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.4rem;
  height: 100vh;
  /* width: 70%; */
  /* align-items: center; */

  @media (max-width: 600px) {
    flex-direction: column;
  }
  `;

//---BussinessInformationCard---


  export const BusinessCardInformationDiv = styled.div`
    align-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;

  export const BussinessInformationCardDetail = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    /* flex-wrap: wrap; */
  `;

  export const BussinessInformationCardDetailItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    p {
      padding: 0;
      margin: 0;
    }
  `;

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
`;

export const ImageDiv = styled.div`
  box-sizing: border-box;
  width: 20%;
  img {
    width: 100%;
    border-radius: 0em 0em 1em 1em;
  }
  align-self: baseline;
`;


export const ButtonPanelDiv = styled.div`
  display: flex;
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
  flex: 1;
  margin-left: inherit;
  margin-right: inherit;
  background-color: ${boxesBackgroundColor};
  color: ${boxesTextColor};
  overflow-y: auto;
  border-radius: 1em 1em 0em 0em;
  box-shadow: ${boxesShadow};
`;

//---Category---

export const DishListWrapper = styled.div`
  gap: 1rem;
  box-sizing: border-box;
  align-self: center;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  border-style: solid;
  border-width: 0 0 0.02rem 0;
  height: 100%;
  width: 100%;
`;

export const CategoryButton = styled(ButtonNormal)`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 90%;
  /* align-self: center; */

  p {
    display: inherit;
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

export const ButtonEditCategory = styled(ButtonNormal)`
  height: 100%;
  /* width: 10%; */
  box-sizing: border-box;
  align-self: center;
`;

export const ButtonDeleteCategory = styled(ButtonWarn)`
  height: 100%;
  /* width: 10%; */
  align-self: center;
`;

//---Dish---

export const DishWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  border-style: solid;
  border-width: 0 0 0.02rem 0;
  opacity: 0.75;
  p {
    margin: 0;
  }
  :hover {
    opacity: 1;
    background-color: ${dishHoverBackgroundColor};
  }
`;
export const DishImage = styled.img`
  height: 100%;
  width: 15%;
  padding: 0.5em;
  border-radius: 2em;
  box-sizing: border-box;
  align-self: center;
`;
export const DishDescriptionWrapper = styled.div`
  height: 100%;
  width: 75%;
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
  /* width: 10%; */
  box-sizing: border-box;
  align-self: center;
`;

export const DishDeleteButton = styled(ButtonWarn)`
  height: 100%;
  /* width: 10%; */
  box-sizing: border-box;
  align-self: center;
`;

//---Modal---

const started = keyframes`    
  from {opacity: 0;} 
  to {opacity: 1;}
`;

export const ModalBackArea = styled.div`
  width: 100%;
  background: #ffffff88;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;

export const ModalArea = styled.div`
  max-width: 90%;
  background: ${boxesBackgroundColor};
  position: relative;
  width: max-content;
  top: 50%;
  padding: 0;
  margin: auto;
  box-sizing: border-box;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  animation: ${started} 500ms normal;
  -webkit-box-shadow: 0 0 10px 0px #000000;
  box-shadow: 0 0 10px 0px #000000;
  border-radius: 1rem 1rem 1rem 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  top: 0;
  left: 0;
  z-index: 1;
  border-style: solid;
  border-width: 0rem 0rem 0.1rem 0rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Title = styled.p`
  display: flex;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  margin: 0;
`;

export const BtnClose = styled(ButtonNormal)`
  margin: 0;
`;

//---CategoryForm---

export const FormDishCategoryDiv = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  background: ${boxesBackgroundColor};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;

export const FormDishCategory = styled.form`
  margin: 0;
  padding: 1em;
  align-content: center;
`;
export const ButtonCreateEdit = styled(ButtonNormal)`
  margin: 1em 0;
  :hover {
    background-color: ${confirmColor};
  }
`;



//---DishForm---

export const ButtonDiv = styled.div`
  button {
    margin: 0;
    align-self: center;
    color: white;
    background-color: #325891;
    padding: 0.5em 1.3em;
    margin: 1em 0em;
    border-style: none;
    border-radius: 0.3em;
    border: none;
    font-size: 1rem;
    height: auto;
    :hover {
      background-color: #3865ad;
      cursor: pointer;
    }
  }
`;

export const ImageForm = styled.img`
  width: 20em;
  height: 20em;
  padding: 5px 5px;
  margin: 0;
  border: 0 solid #ccc;
  border-radius: 1em;
  box-sizing: border-box;
`;

export const ImageFormLabel = styled.label`
  align-self: center;
  color: white;
  background-color: #325891;
  padding: 0.5em 1.3em;
  margin: 1em 1em;
  border-radius: 0.3em;
  border: 1px black;
  font-size: 1rem;
  height: auto;
  :hover {
    background-color: #3865ad;
    cursor: pointer;
  }
`;

export const ImageInput = styled.input`
  opacity: 0;
  width: 0;
`;

export const ImageFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  button {
    background-color: #7f9ccb;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px ridge black;
    font-size: 0.8rem;
    height: auto;
  }
`;

export const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px 0 0;
  width: 100%;

  input,
  textarea,
  select {
    padding: 5px 5px;
    margin: 0;
    border: 0em solid #ccc;
    box-sizing: border-box;
  }
`;

export const FormDishDiv = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background: inherit;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999999;
`;

export const FormDish = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em;
  max-width: 80%;

  @media only screen and (min-width: 768px) {
    .FormDiv {
      flex-direction: row;
    }
  }

  .InputsDiv .ImageFormDiv {
    flex-basis: 100%;
    margin: 10px;
  }

  @media only screen and (min-width: 768px) {
    .InputsDiv .ImageFormDiv {
      flex-basis: 50%;
    }
  }
`;
