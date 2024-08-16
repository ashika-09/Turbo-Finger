import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const SignupForm=()=>{

    const [email , setemail]=useState('');
    const [password , setpassword]=useState('');
    const [confirmPassword , setconfirmPassword]=useState('');
    const {theme}=useTheme();
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
          >SignUp</Button>
        </Box>
    )
}
export default SignupForm;