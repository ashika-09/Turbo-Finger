import React ,  { createContext , useState , useContext } from "react";
import { ThemeOpsn } from "../utils/ThemeOpsn";

const ThemeContext= createContext();

export const ThemeContextProvider = ({children})=>{

    const defaultValue=JSON.parse(localStorage.getItem('theme')) || ThemeOpsn[0].value
    const [theme , setTheme] = useState(defaultValue);

    const values = {
        theme ,
        setTheme
    }

    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>);
};

export const useTheme = () => useContext(ThemeContext);