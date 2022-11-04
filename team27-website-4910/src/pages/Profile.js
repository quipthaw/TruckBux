import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
    userType,
    userName,
    userFName,
    userLName,
    userEmail,
    userBio,
    userSponsors
} from '../recoil_atoms';

export default function Profile() {
    const navigate = useNavigate();

    const [usernameState, setUsernameState ] = useRecoilState(userName);

    /*
    const [sessionState, setSessionState] = useRecoilState(userType);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [firstnameState, setFirstnameState] = useRecoilState(userFName);
    const [lastnameState, setLastnameState] = useRecoilState(userLName);
    const [emailState, setEmailState] = useRecoilState(userEmail);
    const [bioState, setBioState] = useRecoilState(userBio);
    const [sponsorIDs, setSponsorIDs] = useRecoilState(userSponsors);
    */

    /*
    useEffect(() => {
        if (sessionState === '0') {
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
    */

    return (
        <div>
            <Layout>
                <ProfileInfo username={usernameState} />
            </Layout>
        </div>
    )
};