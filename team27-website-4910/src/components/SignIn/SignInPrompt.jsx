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
        
        const userData = { user: username };
        const userOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };

        let userResponse = await fetch('http://127.0.0.1:5000/checkuser', userOptions);

        userResponse = await userResponse.json();

        const validateData = { usr: username, pwd: password };
        const validateOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validateData)
        };

        let validateResponse = await fetch('http://127.0.0.1:5000/checkpassword', validateOptions);

        validateResponse = await validateResponse.json();
        
        if(userResponse.result === "FALSE") {
            if(validateResponse.results === "Valid Login") {
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