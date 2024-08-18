import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs, Box } from '@mui/material';
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../context/ThemeContext";
import GoogleButton from 'react-google-button'
import { signInWithPopup , GoogleAuthProvider}  from 'firebase/auth'
import errorMapping from "../utils/errorMapping";
import { toast , Bounce , ToastContainer } from "react-toastify";
import { auth } from "../firebaseConfig";

const AccountCircle = () => {
    const [open, setopen] = useState(false);
    const [value, setvalue] = useState(0);
    const { theme } = useTheme();

    const handleModalOpen = () => {
        setopen(true);
    }

    const handleClose = () => {
        setopen(false);
    }

    const handlevalueChange = (event, value) => {
        setvalue(value);
    }

    const googleProvider= new GoogleAuthProvider();

    const handleGoogleSingin=()=>{
        signInWithPopup(auth, googleProvider).then((res)=>{
            toast.success('Google Loggin Successful', {
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
        }).catch((err)=>{
            
            toast.error(errorMapping[err.code] || 'not able to use google authentication', {
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
        })
    }

    return (
        <div>
            <AccountCircleIcon onClick={handleModalOpen} />
            <Modal open={open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <div style={{ width: "400px", textAlign: "center" }}>

                    <AppBar position="static" style={{ background: 'transparent' }}>
                        <Tabs variant="fullWidth" value={value}
                            onChange={handlevalueChange}
                        >
                            <Tab label='login' style={{ color: theme.textColor }}></Tab>
                            <Tab label='SignUp' style={{ color: theme.textColor }}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm />}
                    {value === 1 && <SignupForm />}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt={2}
                    >
                        <span>OR</span>
                        <Box mt={2} width="auto" >
                            <GoogleButton
                                style={{ width: '350px', height: "50px", marginTop: "15px", borderRadius: "3px" }}
                                 onClick={handleGoogleSingin}
                           />
                        </Box>
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle;