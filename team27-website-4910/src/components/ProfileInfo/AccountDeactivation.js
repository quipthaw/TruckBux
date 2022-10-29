import React, { useState, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../..';

export const AccountDeactivation = (props) => {
    const navigate = useNavigate();

    const { userInfo } = props;

    const { setSessionState, usernameState } = useContext(SessionContext);

    const [ deactivating, setDeactivating ] = useState(false);
    const [ finalConfirmation, setFinalConfirmation ] = useState(false);
    const [ systemMessage, setSystemMessage ] = useState('');

    const [ buttonMessage, setButtonMessage ] = useState(userInfo.active ? "Deactivate Account" : "Activate Account");
    const [ buttonColor, setButtonColor ] = useState(userInfo.active ? "error" : "success");

    const toggleDeactivating = () => {
        setSystemMessage('');
        setDeactivating(deactivating ? false : true);
    };

    const cancelDeactivation = () => {
        setSystemMessage('');
        setDeactivating(false);
        setFinalConfirmation(false);
    };

    const toggleButton = () => {
        setButtonMessage(userInfo.active === 0 ? "Deactivate Account" : "Activate Account");
        setButtonColor(userInfo.active === 0 ? "error" : "success");
    }

    const toggleActivation = async () => {
        //Need logging in the future
        //const modder = usernameState;
        const target = userInfo.username;
        const newActive = userInfo.active ? 0 : 1;

        const statusChangeData = { 
            user: target, 
            status: newActive
        };
        
        const statusChangeOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChangeData)
        };

        let statusChangeResponse = await fetch('http://127.0.0.1:5000/updatestatus', statusChangeOptions);
        
        statusChangeResponse = await statusChangeResponse.json();

        if(statusChangeResponse.response === 'Success') {
            //Kick the user to homepage if they deactivate own account
            if(userInfo.username === usernameState) {
                setSessionState('0')
                navigate('/');
            }
            userInfo.setProfile.setActive(userInfo.active ? 0 : 1);
            console.log(userInfo.active);
            toggleButton();
            console.log(buttonColor);
            console.log(buttonMessage);
            setDeactivating(false);
            setFinalConfirmation(false);
        }
        else {
            setSystemMessage("This account status could not be changed.")
            setDeactivating(false);
            setFinalConfirmation(false);
        }
    };

    return (
        <Stack direction='column' spacing={2}>
            {!deactivating && <Button variant='outlined' color={buttonColor} startIcon={<DeleteIcon/>} onClick={(toggleDeactivating)}>{buttonMessage}</Button>}
            {systemMessage !== '' && <Typography align='center' color={buttonColor}>{systemMessage}</Typography>}
            {!finalConfirmation && deactivating && <Button variant='contained' color={buttonColor} startIcon={<DeleteIcon/>} onClick={(toggleActivation)}>{buttonMessage}</Button>}
            {deactivating && <Button variant='outlined' color='success' onClick={(cancelDeactivation)}>Cancel Activation Setting</Button>}
        </Stack>
    );
};