import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { ToastVisibilityContext } from "../context/userContext";

const ToastMessage = ({ message, type, duration }) => {
//   const [isVisible, setIsVisible] = useState(false);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext);

  useEffect(() => {
    // setIsVisible(true)
    const timeoutId = setTimeout(() => {
        setToastVisible(!toastVisible);
        setToastMessage('')
        setToastType('')

    }, 15000);
    return () => clearTimeout(timeoutId);
  }, [duration]);

  return (
    <Toast type={type} hidden={!toastVisible}> 
      {console.log('message: ', message)} 
      <p>{message}</p>
    </Toast>
  );
};

export default ToastMessage;

let Toast = styled.div`
  width: auto;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-top:0;
  margin-bottom:0;
  padding: 0em 1em;
  transform: translateX(-50%);
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  color: #050000;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  opacity: 0.7;
  background-color: ${(props) => {
    switch (props.type) {
      case "success":
        return "#17a45c";
      case "error":
        return "#ed5e5e";
      case "information":
        return "#e0cb54";
      default:
        return "#325891";
    }
  }};
`;
