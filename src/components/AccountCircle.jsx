import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { useState } from "react";

const AccountCircle = () => {
    const [open, setopen] = useState(false);
    const [value, setvalue] = useState(0);

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
                            <Tab label='login'></Tab>
                            <Tab label='SignUp'></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <h1>Login form</h1>}
                    {value === 1 && <h1>SignUp form</h1>}
                    
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle;