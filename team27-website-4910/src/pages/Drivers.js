import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import ManageAccounts from '../components/ManageAccount/ManageAccounts';
import { useNavigate } from 'react-router-dom';

export default function Drivers() {
    const [sessionState, setSessionState] = useRecoilState(userType);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sponsor, setSponsor] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionState !== 'A' && sessionState !== 'S') { navigate('/'); }
    }, []);

    const getSponsorName = async () => {
        const URL = `http://127.0.0.1:5000/sponsors?user=${usernameState}`
        const response = await fetch(URL);
        const result = await response.json();

        setSponsor(result.relatedSponsors[0].sponsorName)
    }

    useEffect(() => {
        if (sessionState === 'A') {
            setSponsor(usernameState);
        }
        else {
            getSponsorName();
        }
    }, [])

    return (
        <Layout>
            {sponsor && <ManageAccounts user={usernameState} sponsor={sponsor} userType={sessionState} />}
        </Layout>
    )
}