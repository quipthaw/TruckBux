import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { useRecoilState } from 'recoil';
import {
    userName,
    userType,
} from '../recoil_atoms';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const navigate = useNavigate();

    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sessionState, setSessionState] = useRecoilState(userType);
    useEffect(() => {
        if (sessionState === '0') { navigate('/'); }
    }, []);

    return (
        <div>
            <Layout>
                <ProfileInfo username={usernameState} />
            </Layout>
        </div>
    )
};