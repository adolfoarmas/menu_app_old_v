import React, { createContext, useEffect, useState } from "react";

const Context = createContext({})

const UserContextProvider = ({ children }) => {

    const [userLogged, setUserLogged] = useState(null)
    const [userLoggedId, setUserLoggedId] = useState(null)
    const [csrfToken, setCsrfToken] = useState(null)
    

    useEffect(() => {
        
        const getUserLoggedTokenValue = () => {
          return window.localStorage.getItem('logedUserToken')
        }

        const getCsrftokenValue = () => {
          return document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];
        
        }

        const getUserLoggedId = () => {
          return window.localStorage.getItem('logedUserId')
        }

        if(getUserLoggedTokenValue){
          setUserLogged(getUserLoggedTokenValue)
          setCsrfToken(getCsrftokenValue)
          setUserLoggedId(getUserLoggedId)
          //console.log('token', userLogged, 'csfrtoken', csrfToken)
        }
      });

    return (
    
      <Context.Provider value={{'token':[userLogged, setUserLogged], 'csfrToken': [csrfToken, setCsrfToken], 'userLoggedId': [userLoggedId, setUserLoggedId]}}>
        {/*user state sent as Context value parameter*/}
        {children}
      </Context.Provider>
      
      )
}

export { Context, UserContextProvider }