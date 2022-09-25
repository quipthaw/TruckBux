import React, { useContext, useState } from "react";
import { SignInPrompt } from './components/SignInPrompt';
import { SessionContext } from "../..";

//There is currently no endpoint to check valid password/user combos.
//To test sign in, use username=testuser and password=password

export const SignIn = (props) => {
    const { sessionState, setSessionState } = useContext(SessionContext);
    const [ signingIn, setSigningIn ] = useState(true);
    const [ signInError, setSignInError ] = useState("");

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

    const DisplaySignInError = () => {
        return (
            <p>{ signInError }</p>
        );
    };

    console.log(sessionState);
    //Display a sign in error if one exists. This isn't currently used - navbar has own signin
    //Log In button only when user has no session and is not actively signing in.
    //Log Out button only when user has a session.
    //Signin Prompt replaces both buttons when user is actively signing in and is not already signed in.
    return (
        <div>
            {!signingIn && sessionState === '0' && <DisplaySignIn/>}
            {sessionState === '0' && signingIn && <DisplayPrompt/>}
            {sessionState != '0' && <DisplaySignOut/>}
            {signInError != "" && <DisplaySignInError/>}
        </div>
    );
};