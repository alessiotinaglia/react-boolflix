import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// const apiUrl = import.meta.env.VITE_API_URL;

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
   const [ query, setQuery ] = useState('');
    
    return (
        <GlobalContext.Provider value={{ query, setQuery }}>
            {children}
        </GlobalContext.Provider>
    );
};

function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}

export { GlobalProvider, useGlobalContext };