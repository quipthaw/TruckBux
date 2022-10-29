import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { SessionContext } from '..';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();

    const {
        sessionState,
        usernameState, 
        firstnameState, setFirstnameState,
        lastnameState, setLastnameState,
        emailState, setEmailState,
        bioState, setBioState,
        sponsorIDs, setSponsorIDs
    } = useContext(SessionContext);

    useEffect(() => {
        if(sessionState === '0') {
            navigate('/');
        }
    }, [sessionState, navigate]);

    const setProfile = {
        'setFirstname': setFirstnameState,
        'setLastname': setLastnameState,
        'setEmail': setEmailState,
        'setBio': setBioState,
    };

    const userInfo = {
        'userType': sessionState,
        'username': usernameState,
        'firstname': firstnameState,
        'lastname': lastnameState,
        'email': emailState,
        'bio': bioState,
        'setProfile': setProfile,
        'active': 1,
        'sponsorIDs': sponsorIDs,
    };

    return (
        <div>
            <Layout>
                <ProfileInfo userInfo={userInfo}/>
            </Layout>
        </div>
    )
};