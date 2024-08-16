import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../context/ThemeContext";

const AccountCircle = () => {
    const [open, setopen] = useState(false);
    const [value, setvalue] = useState(0);
    const {theme} = useTheme();

    const handleModalOpen = () => {
        setopen(true);
    }

    const handleClose = () => {
        setopen(false);
    }

    const handlevalueChange = (event, value) => {
        setvalue(value);
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

                <div style={{ width: "400px" }}>

                    <AppBar position="static" style={{ background: 'transparent' }}>
                        <Tabs variant="fullWidth" value={value}
                            onChange={handlevalueChange}
                        >
                            <Tab label='login' style={{color:theme.textColor}}></Tab>
                            <Tab label='SignUp' style={{color:theme.textColor}}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm/>}
                    {value === 1 && <SignupForm/>}

                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle;