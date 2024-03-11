import { createContext, useState } from "react";


export const ContextApp = createContext()



export const GlobalState = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    return {
        isAuthenticated,
        setIsAuthenticated
    }   
}







