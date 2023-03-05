import styled from 'styled-components';
import React from "react";
import DishList from "./pages/DishList";
import UserLogin from "./pages/UserLogin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import { UserContextProvider } from './context/userContext';
// import NewDish from "./pages/NewDish";
// import NewDishCategory from "./pages/NewDishCategory"

//import './App.css';

const App = () => 
    
{ 
  return (<AppWrapper>
    <UserContextProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<DishList />} />
                <Route path="/login" element={<UserLogin />} />
                {/* <Route path="/NewDish" element={<NewDish />} />
                <Route path="/NewDishCategory" element={<NewDishCategory />} /> */}
            </Routes>
        </Router>
        
    </UserContextProvider>
  </AppWrapper> 
)}

export default App;

const AppWrapper = styled.div`
  width: 60%;
  align-items: center;
  //display: flex;
  //flex-flow: column;
`