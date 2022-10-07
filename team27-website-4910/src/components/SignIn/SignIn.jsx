import React, { useContext, useState } from "react";
import { SignInPrompt } from './SignInPrompt';
import { SessionContext } from "../..";
import { Paper, Button, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { UpdatePassword } from "../PasswordRecovery/UpdatePassword";

//There is currently no endpoint to check valid password/user combos.
//To test sign in, use username=testuser and password=password

export const SignIn = (props) => {
    const { sessionState, setSessionState } = useContext(SessionContext);
    const [signingIn, setSigningIn] = useState(true);
    const [signInError, setSignInError] = useState("");
    
    const [ updatingPassword, setUpdatingPassword ] = useState(false);
    
    const toggleUpdatingPassword = () => {
        setUpdatingPassword( updatingPassword ? false : true);
    };

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
                    <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>
                        {!updatingPassword && !signingIn && sessionState === '0' && <DisplaySignIn />}
                        {!updatingPassword && sessionState === '0' && signingIn && <DisplayPrompt />}
                        {!updatingPassword && sessionState != '0' && <DisplaySignOut />}
                        {!updatingPassword && signInError != "" && <Typography align='center' color='red'>{signInError}</Typography>}
                        {!updatingPassword && <Button variant="outlined" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Change Password</Button>}
                        {updatingPassword && <UpdatePassword/>}
                        {updatingPassword && <Button variant="outlined" onClick={(toggleUpdatingPassword)} sx={{ width: '100%' }}>Go Back to Sign In</Button>}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};