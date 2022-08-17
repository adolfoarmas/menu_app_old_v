import React from "react";
import DishList from "./pages/DishList";
import NewDish from "./pages/NewDish";
import UserLogin from "./pages/UserLogin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import './App.css';

const App = () => (

<div className="App">
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<DishList />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/NewDish" element={<NewDish />} />
        </Routes>
    </Router>
  </div> 
);

export default App;
