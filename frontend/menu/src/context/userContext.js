import React, { createContext, useEffect, useState } from "react";
// import getDishCategories from "../services/dishCategory/getDishCategories";
import {DISH_CATEGORIES} from "../services/settings"
import { fetchData } from "../services/fetchData";

const Context = createContext({})
const CategoriesContext = createContext({})
const UpdateViewContext = createContext({})


// const apiData = fetchData(DISH_CATEGORIES);

const fetchCategories = fetchData(DISH_CATEGORIES) 

const UserContextProvider = ({ children }) => {

    const apiData = fetchCategories;
    const dishCategoriesApi = apiData.read();

    const [userLogged, setUserLogged] = useState(null)
    const [csrfToken, setCsrfToken] = useState(null)
    const [userLoggedId, setUserLoggedId] = useState(null)
    const [updateView, setUpdateView] = useState(1)
    const [dishCategories, setDishCategories] = useState(dishCategoriesApi)
    
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

        if(getUserLoggedTokenValue) {
          setUserLogged(getUserLoggedTokenValue)
          setCsrfToken(getCsrftokenValue)
          setUserLoggedId(getUserLoggedId)
          //console.log('token', userLogged, 'csfrtoken', csrfToken)
        }
        
        const apiData = fetchCategories;
        const dishCategoriesApi = apiData.read();
        setDishCategories(dishCategoriesApi)

      }, [updateView]);

    return (
    
      <Context.Provider value={{'token':[userLogged, setUserLogged], 'csfrToken': [csrfToken, setCsrfToken], 'userLoggedId': [userLoggedId, setUserLoggedId]}}>
        <CategoriesContext.Provider value={[dishCategories, setDishCategories]}>
          <UpdateViewContext.Provider value={[updateView, setUpdateView]}>
            {/*user state sent as Context value parameter*/}
            {children}
          </UpdateViewContext.Provider>
        </CategoriesContext.Provider>
      </Context.Provider>
      
      )
}

export { Context, CategoriesContext, UpdateViewContext, UserContextProvider }