import React, { useState, useContext, useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    userType,
    userName
} from '../../recoil_atoms';

export const AccountDeactivation = (props) => {
    const navigate = useNavigate();

    const userInfo = props;
    console.log(userInfo)

    const [sessionState, setSessionState] = useRecoilState(userType);
    const [usernameState, setUsernameState] = useRecoilState(userName);

    const [deactivating, setDeactivating] = useState(false);
    const [finalConfirmation, setFinalConfirmation] = useState(false);
    const [systemMessage, setSystemMessage] = useState('');

    const [buttonMessage, setButtonMessage] = useState("Deactivate Account");
    const [buttonColor, setButtonColor] = useState("error");

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
        setButtonMessage(Number(userInfo.active) === 0 ? "Deactivate Account" : "Activate Account");
        setButtonColor(Number(userInfo.active) === 0 ? "error" : "success");
    }

    useEffect(() => {
        setButtonColor((userInfo.active === '1') ? "error" : "success");
        setButtonMessage((userInfo.active === '1') ? "Deactivate Account" : "Activate Account");
    }, [userInfo])

    const toggleActivation = async () => {
        //Need logging in the future
        //const modder = usernameState;
        const target = userInfo.username;
        const newActive = (userInfo.active === '1') ? 0 : 1;

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

        let statusChangeResponse = await fetch('https://team27.cpsc4911.com/updatestatus', statusChangeOptions);

        statusChangeResponse = await statusChangeResponse.json();

        console.log(statusChangeResponse)

        if (statusChangeResponse.response === 'Success') {
            //Kick the user to homepage if they deactivate own account
            if (userInfo.username === usernameState) {
                setSessionState('0')
                navigate('/');
            }
            userInfo.setProfileInfo((prevInfo) => {
                const newProfileInfo = { ...prevInfo };

                newProfileInfo.active = (userInfo.active === '1') ? '0' : '1';

                return newProfileInfo;
            })
            toggleButton();
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
            {!deactivating && <Button variant='outlined' color={buttonColor} startIcon={<DeleteIcon />} onClick={(toggleDeactivating)}>{buttonMessage}</Button>}
            {systemMessage !== '' && <Typography align='center' color={buttonColor}>{systemMessage}</Typography>}
            {!finalConfirmation && deactivating && <Button variant='contained' color={buttonColor} startIcon={<DeleteIcon />} onClick={(toggleActivation)}>{buttonMessage}</Button>}
            {deactivating && <Button variant='outlined' color='success' onClick={(cancelDeactivation)}>Cancel Activation Setting</Button>}
        </Stack>
    );
};