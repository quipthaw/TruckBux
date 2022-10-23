import React, { useState, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../..';

export const AccountDeactivation = (props) => {
    const navigate = useNavigate();

    const { setSessionState, usernameState } = useContext(SessionContext);

    //const { username, accountStatus } = props.userInfo;

    const [ deactivating, setDeactivating ] = useState(false);
    const [ finalConfirmation, setFinalConfirmation ] = useState(false);
    const [ systemMessage, setSystemMessage ] = useState('');

    const toggleDeactivating = () => {
        setSystemMessage('');
        setDeactivating(deactivating ? false : true);
    };

    const cancelDeactivation = () => {
        setSystemMessage('');
        setDeactivating(false);
        setFinalConfirmation(false);
    };

    const deactivateAccount = async () => {
        const deactivateData = { user: usernameState, status: 0 };
        
        const deactivateOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deactivateData)
        };

        let deactivateResponse = await fetch('http://127.0.0.1:5000/updatestatus', deactivateOptions);
        
        deactivateResponse = await deactivateResponse.json();

        if(deactivateResponse.response === 'Success') {
            setSessionState('0')
            navigate('/');
        }
        else {
            setSystemMessage("This account could not be deactivated or is already deactivated.")
            setDeactivating(false);
            setFinalConfirmation(false);
        }
    };

    return (
        <Stack direction='column' spacing={2}>
            {!deactivating && <Button variant='outlined' color='error' startIcon={<DeleteIcon/>} onClick={(toggleDeactivating)}>Deactivate Account</Button>}
            {systemMessage !== '' && <Typography align='center' color='red'>{systemMessage}</Typography>}
            {!finalConfirmation && deactivating && <Button variant='contained' color='error' startIcon={<DeleteIcon/>} onClick={(deactivateAccount)}>CONFIRM ACCOUNT DEACTIVATION</Button>}
            {deactivating && <Button variant='outlined'  color='success' onClick={(cancelDeactivation)}>Cancel Account Deactivation</Button>}
        </Stack>
    );
};