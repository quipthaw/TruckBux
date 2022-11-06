import React from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import ManageAccounts from '../components/ManageAccount/ManageAccounts';

export default function Drivers() {
    const [ usernameState, setUsernameState ] = useRecoilState(userName);
    const [ sessionState, setSessionState ] = useRecoilState(userType);

    return (
        <Layout>
            <ManageAccounts user={usernameState} userType={sessionState}/>
        </Layout>
    )
}