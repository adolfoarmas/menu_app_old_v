import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #606060;
  height: inherit;

`
root.render(
  <React.StrictMode>
    <AppWrapper>
      <App/>
    </AppWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

