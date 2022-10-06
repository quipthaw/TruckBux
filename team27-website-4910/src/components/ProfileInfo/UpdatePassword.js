import React, { useState, useContext } from 'react';
import { SessionContext } from '../..';
import { Button, TextField, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const UpdatePassword = () => {
    const {
        usernameState,
        firstnameState,
        lastnameState,
        emailState,
    } = useContext(SessionContext);

    const [ updatingPassword, setUpdatingPassword ] = useState(false);
    const [ updatingPasswordMessage, setUpdatingPasswordMessage ] = useState('');

    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const [ showPasswordState, setShowPasswordState ] = useState(false);

    const NoPasswordError = '';
    const [ passwordError, setPasswordError ] = useState(NoPasswordError);

    const handleShowPassword = () => {
        setShowPasswordState(showPasswordState ? false : true);
    };

    const toggleUpdatingPassword = () => {
        setUpdatingPassword(updatingPassword ? false : true);
    };
    
    const PasswordVisibilityAdornment = () => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                >
                    {showPasswordState ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        );
    };

    const onNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleUpdatePassword = async () => {
        const passwordData = { 
            user: usernameState,
            email: emailState,
            fname: firstnameState,
            lname: lastnameState,
            pass: newPassword,
        };

        const passwordOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData)
        };

        let passwordResponse = await fetch('http://127.0.0.1:5000/resetpass', passwordOptions);

        passwordResponse = await passwordResponse.json();

        if(passwordResponse.error === 'True') {
            setPasswordError(passwordResponse.reason);
        }
        else {
            setUpdatingPasswordMessage("Successfully Updated Password");
            setPasswordError(NoPasswordError);
            toggleUpdatingPassword();
        }
    };

    return (
        <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>
            {updatingPassword && <Stack direction='row' spacing={2}>
                <TextField
                    id="newpassword"
                    label="New Password"
                    fullWidth
                    value={newPassword}
                    onChange={onNewPasswordChange}
                    error={passwordError === NoPasswordError ? false : true}
                    helperText={passwordError}
                    type={showPasswordState ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <PasswordVisibilityAdornment/>
                        )
                    }}
                />
                <TextField
                    id="confirmpassword"
                    label="Confirm Password"
                    fullWidth
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    error={newPassword === confirmPassword ? false : true}
                    helperText={newPassword === confirmPassword ? 'Passwords match!' : 'Passwords do not match!'}
                    type={showPasswordState ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <PasswordVisibilityAdornment/>
                        )
                    }}
                />
            </Stack>}
            {updatingPasswordMessage !== '' && <Typography align='center' color='lightgreen'>{updatingPasswordMessage}</Typography>}
            {!updatingPassword && <Button variant="text" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Change Password</Button>}
            {updatingPassword && <Button variant="text" onClick={(handleUpdatePassword)} sx={{ width: '100%' }}>Confirm Password</Button>}
        </Stack>
    );
};