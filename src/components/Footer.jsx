import React, {useState} from "react";
import Select from "react-select";
import { ThemeOpsn } from "../utils/ThemeOpsn";
import { useTheme } from '../context/ThemeContext';

const Footer=()=>{
   
    const {setTheme , theme}= useTheme();
    const handleChange =(event)=>{
         
           setTheme(event.value);
           localStorage.setItem("theme", JSON.stringify(event.value));
    };

    return (
        <div className='footer'>
          <div className='links'>links</div>
           <div className="themebutton">
        <Select
         
         onChange={handleChange}
         options={ThemeOpsn}
         menuPlacement="top"
         defaultValue={{label: theme.label, value:theme}}
         styles={{
            control: (base) => ({
                ...base,
                backgroundColor: theme.background,
            }),
            menu: (base) => ({
                ...base,
                backgroundColor: theme.background,
            }),
            option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? theme.textColor : theme.background,
                color: isFocused ? theme.background : theme.textColor,
                cursor: 'pointer',
            }),
        }}
        
        />
 
           </div>
        </div>
    )
}
export default Footer;