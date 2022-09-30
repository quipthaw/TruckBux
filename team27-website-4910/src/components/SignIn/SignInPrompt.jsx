import React, { useState, useContext } from 'react';
import { SessionContext } from '../..';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, TextField, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const SignInPrompt = (props) => {
    const navigate = useNavigate();
    const { setSessionState, setUsernameState } = useContext(SessionContext);
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
        
        if(loginResponse.result === "True") {
            setSignInError("");
            setSigningIn(false);
            setSessionState('D');
            setUsernameState(username);
            navigate('/');
        }
        else {
            setSignInError("User and Password Combination Incorrect");
        }
    };

    return (
        <Container sx={{
            width: '90% ',
            display: 'flex',
            marginY: '5vh'
        }}>
            <Paper sx={{ width: '100%' }}> 
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    padding: '25px'
                }}>
                    <Stack direction='column' spacing={2} justifyContent='center' alignItems='center' alignContent='center'>
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
                        <Button variant='outlined' onClick={authenticate} sx={{ width: '100%' }}>Sign In</Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};