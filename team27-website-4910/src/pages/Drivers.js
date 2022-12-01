import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import ManageAccounts from '../components/ManageAccount/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import { PurchaseHistory } from '../components/PurchaseHistory/PurchaseHistory';

export default function Drivers() {
    const [sessionState, setSessionState] = useRecoilState(userType);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionState !== 'A' && sessionState !== 'S') { navigate('/'); }
    }, []);

    const getSponsorName = async () => {
        const URL = `https://team27.cpsc4911.com/sponsors?user=${usernameState}`
        const response = await fetch(URL);
        const result = await response.json();

        setUser(result.relatedSponsors[0].sponsorName)
    }

    useEffect(() => {
        if (sessionState === 'A') {
            setUser(usernameState);
        }
        else {
            getSponsorName();
        }
    }, [])

    return (
        <Layout>
            {user && <ManageAccounts user={user} userType={sessionState} />}
        </Layout>
    )
}