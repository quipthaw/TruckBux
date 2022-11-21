import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import ManageAccounts from '../components/ManageAccount/ManageAccounts';
import { useNavigate } from 'react-router-dom';

export default function Drivers() {
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sessionState, setSessionState] = useRecoilState(userType);

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionState !== 'A' && sessionState !== 'S') { navigate('/'); }
    }, []);

    return (
        <Layout>
            <ManageAccounts user={usernameState} userType={sessionState} />
        </Layout>
    )
}