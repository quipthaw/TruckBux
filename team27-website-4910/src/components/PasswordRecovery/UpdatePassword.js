import React, { useState, useContext } from 'react';
import { SessionContext } from '../..';
import { Button, TextField, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

export const UpdatePassword = () => {
    const {
        sessionState,
        usernameState,
        firstnameState,
        lastnameState,
        emailState,
    } = useContext(SessionContext);

    const navigate = useNavigate();

    //Variables for password recovery when not signed in
    const [ needVerification, setNeedVerification ] = useState(sessionState === '0' ? true : false)

    const [ recoveryUsername, setRecoveryUsername ] = useState(needVerification ? '' : usernameState);
    const [ recoveryFirstname, setRecoveryFirstname ] = useState(needVerification ? '' : firstnameState);
    const [ recoveryLastname, setRecoveryLastname ] = useState(needVerification ? '' : lastnameState);
    const [ recoveryEmail, setRecoveryEmail ] = useState(needVerification ? '' : emailState);

    //General password change variables
    const [ updatingPassword, setUpdatingPassword ] = useState(needVerification ? true : false);
    const [ updatingPasswordMessage, setUpdatingPasswordMessage ] = useState('');

    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    //Visibility of password fields
    const [ showPasswordState, setShowPasswordState ] = useState(false);

    const NoPasswordError = '';
    const [ passwordError, setPasswordError ] = useState(NoPasswordError);

    //Password recovery when not signed in
    const onUsernameChange = (e) => {
        setRecoveryUsername(e.target.value);
    };
    const onFirstnameChange = (e) => {
        setRecoveryFirstname(e.target.value);
    };
    const onLastnameChange = (e) => {
        setRecoveryLastname(e.target.value);
    };
    const onEmailChange = (e) => {
        setRecoveryEmail(e.target.value);
    };

    //General password change functionality
    const handleShowPassword = () => {
        setShowPasswordState(showPasswordState ? false : true);
    };

    const toggleUpdatingPassword = () => {
        setNewPassword('');
        setConfirmPassword('');
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

        let passwordData = { 
            user: recoveryUsername,
            email: recoveryEmail,
            fname: recoveryFirstname,
            lname: recoveryLastname,
            pass: newPassword,
        };
        if(sessionState !== '0'){
            passwordData = { 
                user: usernameState,
                email: emailState,
                fname: firstnameState,
                lname: lastnameState,
                pass: newPassword,
            };
        }


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
            if(sessionState === '0') {
                navigate('../login/');
            }
            setPasswordError(NoPasswordError);
            toggleUpdatingPassword();
        }
    };

    return (
        <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>
            {needVerification && updatingPassword &&         
                <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>
                    <TextField
                        id="username"
                        label="username"
                        fullWidth
                        value={recoveryUsername}
                        onChange={onUsernameChange}
                        inputProps={{
                            disabled: needVerification ? false : true
                        }}
                    />
                    <TextField
                        id="email"
                        label="email"
                        fullWidth
                        value={recoveryEmail}
                        onChange={onEmailChange}
                        inputProps={{
                            disabled: needVerification ? false : true
                        }}
                    />
                    <TextField
                        id="firstname"
                        label="firstname"
                        fullWidth
                        value={recoveryFirstname}
                        onChange={onFirstnameChange}
                        inputProps={{
                            disabled: needVerification ? false : true
                        }}
                    />
                    <TextField
                        id="lastname"
                        label="lastname"
                        fullWidth
                        value={recoveryLastname}
                        onChange={onLastnameChange}
                        inputProps={{
                            disabled: needVerification ? false : true
                        }}
                    />
                </Stack>
            }
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
                />
                <TextField
                    id="confirmpassword"
                    label="Confirm Password"
                    fullWidth
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    error={newPassword === confirmPassword ? false : true}
                    helperText={confirmPassword === '' && newPassword === '' ? '' : newPassword === confirmPassword ? 'Passwords match!' : 'Passwords do not match!'}
                    type={showPasswordState ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <PasswordVisibilityAdornment/>
                        )
                    }}
                />
            </Stack>}
            {updatingPasswordMessage !== '' && <Typography align='center' color='lightgreen'>{updatingPasswordMessage}</Typography>}
            {!needVerification && !updatingPassword && <Button variant="text" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Change Password</Button>}
            {updatingPassword && <Button variant="outlined" onClick={(handleUpdatePassword)} sx={{ width: '100%' }}>Confirm Password</Button>}
            {!needVerification && updatingPassword && <Button variant="outlined" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Cancel Password Update</Button>}
        </Stack>
    );
};