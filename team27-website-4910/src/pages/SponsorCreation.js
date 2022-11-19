import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import SponsorForm from '../components/SponsorCreation/SponsorForm';
import { useNavigate } from 'react-router-dom';
import {
    userType,
} from '../recoil_atoms';
import { useRecoilState } from 'recoil';

export default function SponsorCreation() {
    const navigate = useNavigate();
    const [sessionState, setSessionState] = useRecoilState(userType);
    useEffect(() => {
        if (sessionState !== 'A') { navigate('/'); }
    }, []);

    return (
        <Layout>
            <SponsorForm />
        </Layout>
    )
}
