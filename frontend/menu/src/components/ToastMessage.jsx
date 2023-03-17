import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { ToastVisibilityContext } from "../context/userContext";
// import './ToastMessage.css';

const ToastMessage = ({ message, type, duration }) => {
//   const [isVisible, setIsVisible] = useState(false);
  const [toastVisible, setToastVisible, toastMessage, setToastMessage, toastType, setToastType] = useContext(ToastVisibilityContext);

  useEffect(() => {
    // setIsVisible(true)
    const timeoutId = setTimeout(() => {
        setToastVisible(!toastVisible);
        setToastMessage('')
        setToastType('')

    }, duration);
    return () => clearTimeout(timeoutId);
  }, [duration]);

  return (
    <Toast type={type} hidden={!toastVisible}>  
      <p>{message}</p>
    </Toast>
  );
};

export default ToastMessage;

let Toast = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  border-radius: 4px;
  color: #050000;
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  background-color: ${props => {
    switch (props.type) {
        case 'success': 
            return '#17a45c';
        case 'error':
            return '#ed5e5e'
        case 'information':
            return '#e0cb54'
        default:
            return '#325891'
    } 
  }};
`;
