import React, { useState, useContext } from 'react';
import { Button, TextField, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../..';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const AccountDeactivation = () => {
    const navigate = useNavigate();

    const { setSessionState, usernameState } = useContext(SessionContext);

    const [deactivating, setDeactivating] = useState(false);
    const [finalConfirmation, setFinalConfirmation] = useState(false);
    const [systemMessage, setSystemMessage] = useState('');
    const [deactivatePassword, setDeactivatePassword] = useState('');
    const [showPasswordState, setShowPasswordState] = useState(false);

    const toggleDeactivating = () => {
        setSystemMessage('');
        setDeactivating(deactivating ? false : true);
    };

    const showFinalConfirmation = async () => {
        const passData = { user: usernameState, pass: deactivatePassword };

        const passOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passData)
        };

        let passResponse = await fetch('https://ec2-52-205-128-217.compute-1.amazonaws.com:8080/checklogin', passOptions);

        passResponse = await passResponse.json();

        if (passResponse.result === 'True') {
            setSystemMessage('');
            setFinalConfirmation(true);
        }
        else {
            setSystemMessage('Incorrect Password');
        }
    };

    const onDeactivatePasswordChange = (e) => {
        setDeactivatePassword(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPasswordState(showPasswordState ? false : true);
    };

    const cancelDeactivation = () => {
        setDeactivatePassword('');
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

        let deactivateResponse = await fetch('https://ec2-52-205-128-217.compute-1.amazonaws.com:8080/updatestatus', deactivateOptions);

        deactivateResponse = await deactivateResponse.json();

        if (deactivateResponse.response === 'Success') {
            setSessionState('0')
            navigate('/');
        }
        else {
            setSystemMessage("This account could not be deactivated or is already deactivated.")
            setDeactivating(false);
            setFinalConfirmation(false);
            setDeactivatePassword('');
        }
    };

    return (
        <Stack direction='column' spacing={2}>
            {!deactivating && <Button variant='outlined' color='error' startIcon={<DeleteIcon />} onClick={(toggleDeactivating)}>Deactivate Account</Button>}

            {!finalConfirmation && deactivating &&
                <TextField
                    id="password"
                    label="password"
                    fullWidth
                    value={deactivatePassword}
                    onChange={onDeactivatePasswordChange}
                    type={showPasswordState ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                    edge="end"
                                >
                                    {showPasswordState ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            }
            {systemMessage !== '' && <Typography align='center' color='red'>{systemMessage}</Typography>}
            {!finalConfirmation && deactivating && <Button variant='outlined' color='error' startIcon={<DeleteIcon />} onClick={(showFinalConfirmation)}>Deactivate Account</Button>}

            {finalConfirmation && deactivating && <Button variant='contained' color='error' startIcon={<DeleteIcon />} onClick={(deactivateAccount)}>CONFIRM ACCOUNT DEACTIVATION</Button>}

            {deactivating && <Button variant='outlined' color='success' onClick={(cancelDeactivation)}>Cancel Account Deactivation</Button>}
        </Stack>
    );
};