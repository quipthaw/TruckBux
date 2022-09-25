import React, { useState } from "react";
import { SignInPrompt } from './components/SignInPrompt';

//There is currently no endpoint to check valid password/user combos.
//To test sign in, use username=testuser and password=password

export const SignIn = (props) => {
    const { sessionExists, setSessionExists } = props;
    const [ signingIn, setSigningIn ] = useState(false);
    const [ signInError, setSignInError ] = useState("");

    const handleLog = () => {
        if(sessionExists) {
            setSessionExists(false);
        }
        else {
            setSigningIn(true);
        }
    };

    const displayLogOut = () => {
        return (
            <button type='button' onClick={handleLog}>Log Out</button>
        );
    };

    const displayLogIn = () => {
        return (
            <button type='button' onClick={handleLog}>Sign In</button>
        );
    }

    const displayPrompt = () => {
        return (
            <SignInPrompt 
                setSessionExists={setSessionExists} 
                setSigningIn={setSigningIn} 
                setSignInError={setSignInError}
            />
        );
    };

    const displaySignInError = () => {
        return (
            <p>{ signInError }</p>
        );
    };

    //Display a sign in error if one exists.
    //Log In button only when user has no session and is not actively signing in.
    //Log Out button only when user has a session.
    //Signin Prompt replaces both buttons when user is actively signing in and is not already signed in.
    return (
        <div>
            {signInError != "" && displaySignInError()}
            {!sessionExists && signingIn && displayPrompt()}
            {sessionExists && displayLogOut()}
            {!sessionExists && !signingIn && displayLogIn()}
        </div>
    );
};