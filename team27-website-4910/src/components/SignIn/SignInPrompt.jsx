import React, { useState, useContext, useInsertionEffect } from 'react';
import { SessionContext } from '../..';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const SignInPrompt = (props) => {
    const navigate = useNavigate();
    const { 
        setSessionState, 
        setUsernameState, 
        setEmailState, 
        setFirstnameState, 
        setLastnameState 
    } = useContext(SessionContext);
    const { setSigningIn, setSignInError } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [ showPasswordState, setShowPasswordState ] = useState(false);

    //Toggle show password visibility in textfield
    const handleShowPassword = () => {
        setShowPasswordState(showPasswordState ? false : true);
    };

    //Update username as user inputs characters
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    //Update password as user inputs characters
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const getUserProfile = async () => {
        const userData = { user: username };
        const userOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };

        let userResponse = await fetch('http://127.0.0.1:5000/getprofile', userOptions);

        userResponse = await userResponse.json();

        if(userResponse.user[0].active === '0') {
            return false;
        }
        else {
            setUsernameState(userResponse.user[0].username);
            setEmailState(userResponse.user[0].email);
            setFirstnameState(userResponse.user[0].fName);
            setLastnameState(userResponse.user[0].lName);
            setSessionState(userResponse.user[0].acctType);
    
            return true;
        }
    };

    //Used when username and password are submitted. Search DB for combo.
    const authenticate = async (e) => {
        e.preventDefault();
        
        //Fetch user/pass combo validation
        const loginData = { user: username, pass: password };
        const loginOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        };

        let loginResponse = await fetch('http://127.0.0.1:5000/checklogin', loginOptions);

        loginResponse = await loginResponse.json();

        //Request to store login attempt log
        const loginAttemptStatus = loginResponse.result === "True" ? 'Success' : 'Failure';

        const attemptData = { user: username, lresult: loginAttemptStatus };

        const attemptOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(attemptData)
        };

        let attemptResponse = await fetch('http://127.0.0.1:5000/loginlog', attemptOptions);

        attemptResponse = await attemptResponse.json();
        
        if(loginResponse.result === "True") {
            if(await getUserProfile()) {
                setSignInError("");
                setSigningIn(false);
                navigate('/');
            }
            else {
                setSignInError("User Account is Currently Deactivated");
            }
        }
        else {
            setSignInError("User and Password Combination Incorrect");
        }
    };

    return (
        <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>            
            <Stack direction='row' spacing={2}>
                <TextField 
                    id="signinUsername"
                    label="username"
                    fullWidth
                    value={username} 
                    onChange={onUsernameChange}
                />
                <TextField
                    id="signinPassword"
                    label="password"
                    fullWidth
                    value={password}
                    onChange={onPasswordChange}
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
            </Stack>
        <Button variant='outlined' onClick={authenticate} sx={{ width: '100%' }}>Sign In</Button>
    </Stack>
    );
};