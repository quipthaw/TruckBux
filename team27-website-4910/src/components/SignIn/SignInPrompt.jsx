import React, { useState, useContext } from 'react';
import { SessionContext } from '../..';
import { useNavigate } from 'react-router-dom';

export const SignInPrompt = (props) => {
    const navigate = useNavigate();
    const { setSessionState, setUsernameState } = useContext(SessionContext);
    const { setSigningIn, setSignInError } = props;
    const [username, setUsername] = useState("");
    const [password, setPassWord] = useState("");

    //Update username as user inputs characters
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    //Update password as user inputs characters
    const onPasswordChange = (e) => {
        setPassWord(e.target.value);
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
        <div>
            <form onSubmit={authenticate}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={onUsernameChange} />
                </label>
                <label>
                    Password:
                    <input type='text' value={password} onChange={onPasswordChange} />
                </label>
                <input type='submit' value="Submit" />
            </form>
        </div>
    );
};