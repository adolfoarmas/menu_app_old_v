import React from "react";
import DishList from "./pages/DishList";
import NewDish from "./pages/NewDish";
import NewDishCategory from "./pages/NewDishCategory"
import UserLogin from "./pages/UserLogin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import { UserContextProvider } from './context/userContext';

//import './App.css';

const App = () => 
    
{ 
  return (<div className="App">
    <UserContextProvider>
             
        
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<DishList />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/NewDish" element={<NewDish />} />
                <Route path="/NewDishCategory" element={<NewDishCategory />} />
            </Routes>
        </Router>
        
    </UserContextProvider>
  </div> 
)}

export default App;
