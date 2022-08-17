import React from "react";
import Logo from '../istockphoto-981368726-170667a.jpg';

const Header = () => {
    return (
        <div className="App-header">
            <div className="App-header-title" >
                <img className="App-header-logo" src={Logo} alt="Logo" />
                <h2>Restaurant Name</h2>
                <a className="App-header-logout App-link" href="%">Log out</a>
            </div>
        </div>
    )
}


export default Header;
                                                                                                                                                    