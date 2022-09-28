import React, { createContext, useEffect, useState } from "react";

const Context = createContext({})

const UserContextProvider = ({ children }) => {

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        
        const getUserLoggedData = () => {
          return window.localStorage.getItem('logedUserMenuApp')
        }

        if(getUserLoggedData){
          return setUserLogged(getUserLoggedData)
        }

      }, []);

    return (
    
      <Context.Provider value={[userLogged, setUserLogged]}>
        {/*user state sent as Context value parameter*/}
        {children}
      </Context.Provider>
      
      )
}

export { Context, UserContextProvider }