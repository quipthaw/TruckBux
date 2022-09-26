import React, { useState, useContext } from 'react';
import { SessionContext } from '../..';
import { Navigate, useNavigate } from 'react-router-dom';

//There is currently no endpoint to check valid password/user combos.
//To test sign in, use username=testuser and password=password

export const SignInPrompt = (props) => {
    const navigate = useNavigate();
    const { setSessionState } = useContext(SessionContext);
    const { setSigningIn, setSignInError } = props;
    const [username, setUsername] = useState("");
    const [password, setPassWord] = useState("");

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassWord(e.target.value);
    };

    const authenticate = async (e) => {
        e.preventDefault();

        const data = { user: username };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        let response = await fetch('http://127.0.0.1:5000/checkuser', options);

        response = await response.json();

        if (response.result === "username taken") {
            if (password === "password") {
                setSignInError("");
                setSigningIn(false);
                setSessionState('D');
                navigate('/');
            }
            else {
                setSignInError("Incorrect Password");
            }
        }
        else {
            setSignInError("Username not found");
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