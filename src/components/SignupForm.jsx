import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { auth , createUserWithEmailAndPassword } from '../firebaseConfig';
import { toast , Bounce } from "react-toastify";
import errorMapping from "../utils/errorMapping";

const SignupForm=({handleClose})=>{

    const [email , setemail]=useState('');
    const [password , setpassword]=useState('');
    const [confirmPassword , setconfirmPassword]=useState('');
    const {theme}=useTheme();

    const handleSubmit=()=>{
        if(!email || !password || !confirmPassword){
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
        if(password !== confirmPassword){
            toast.warning('Password Mismatched', {
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

        auth.createUserWithEmailAndPassword(email, password).then((res)=>{
            toast.success('User Created', {
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
            <TextField
                variant='outlined'
                type='email'
                label='Enter Confirm Password'
                onChange={(event)=>setconfirmPassword(event.target.value)}
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
         >SignUp</Button>
        </Box>
    )
}
export default SignupForm;