import { useTheme } from "../context/ThemeContext";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { toast , Bounce , ToastContainer } from "react-toastify";
import errorMapping from "../utils/errorMapping";



const LoginForm=({handleClose})=>{

    const [email , setemail]=useState('');
    const [password , setpassword]=useState('');
    const  {theme} =useTheme();

    const handleSubmit=()=>{
         if(!email || !password){

          toast.warning('Please fill all the details', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          return;
         }

         auth.signInWithEmailAndPassword(email, password).then((res)=>{
          toast.success('you are Logged In', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
            handleClose();
         }).catch((err)=>{
          toast.error(errorMapping[err.code] || 'some error occured', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
         });
    }

    return (
        <Box
          p={3}
          style={{
            display:'flex',
            flexDirection:'Column',
            gap : '20px'
          }}>
           <TextField
              variant='outlined'
              type='email'
              label='Enter Email'
              onChange={(event)=>setemail(event.target.value)}
              InputLabelProps={{
                style:{
                    color: theme.textColor
                }
              }}
              InputProps={{
                style:{
                    color: theme.textColor
                }
              }}
           />
           <TextField
                variant='outlined'
                type='email'
                label='Enter Password'
                onChange={(event)=>setpassword(event.target.value)}
                InputLabelProps={{
                    style:{
                        color: theme.textColor
                    }
                  }}
                  InputProps={{
                    style:{
                        color: theme.textColor
                    }
                  }}
           />
          <Button
            variant='contained'
            size='large'
            style={{backgroundColor: theme.textColor , color: theme.background}}
             onClick={handleSubmit}
          >Login</Button>
        </Box>
    )
}
export default LoginForm;