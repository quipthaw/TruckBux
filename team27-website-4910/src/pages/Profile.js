import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { SessionContext } from '..';

export default function Profile() {

    const {
        sessionState,
        usernameState, 
        firstnameState, setFirstnameState,
        lastnameState, setLastnameState,
        emailState, setEmailState,
        bioState, setBioState
    } = useContext(SessionContext);

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
        'setProfile': setProfile
    };

    return (
        <div>
            <Layout>
                <ProfileInfo userInfo={userInfo}/>
            </Layout>
        </div>
    )
};