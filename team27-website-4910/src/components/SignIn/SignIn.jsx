import React, { useContext, useState } from "react";
import { SignInPrompt } from './SignInPrompt';
import { SessionContext } from "../..";
import { Paper, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

//There is currently no endpoint to check valid password/user combos.
//To test sign in, use username=testuser and password=password

export const SignIn = (props) => {
    const { sessionState, setSessionState } = useContext(SessionContext);
    const [signingIn, setSigningIn] = useState(true);
    const [signInError, setSignInError] = useState("");

    const handleSignIn = () => {
        setSigningIn(true);
    };

    const handleSignOut = () => {
        setSigningIn(true);
        setSessionState('0');
    };

    const DisplaySignOut = () => {
        return (
            <button type='button' onClick={handleSignOut}>Log Out</button>
        );
    };

    const DisplaySignIn = () => {
        return (
            <button type='button' onClick={handleSignIn}>Sign In</button>
        );
    };

    const DisplayPrompt = () => {
        return (
            <SignInPrompt
                setSessionState={setSessionState}
                setSigningIn={setSigningIn}
                setSignInError={setSignInError}
            />
        );
    };

    //Display a sign in error if one exists. 
    //Log In button only when user has no session and is not actively signing in. This isn't currently used - navbar has own signin
    //Log Out button only when user has a session.
    //Signin Prompt replaces both buttons when user is actively signing in and is not already signed in.
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
                    {!signingIn && sessionState === '0' && <DisplaySignIn />}
                    {sessionState === '0' && signingIn && <DisplayPrompt />}
                    {sessionState != '0' && <DisplaySignOut />}
                    {signInError != "" && <Typography align='center' color='red'>{signInError}</Typography>}
                </Box>
            </Paper>
        </Container>
    );
};