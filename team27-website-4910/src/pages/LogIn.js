import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { SignIn } from '../components/SignIn/SignIn';
import { userType } from '../recoil_atoms';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function LogIn() {

    const navigate = useNavigate();
    const [sessionState, setSessionState] = useRecoilState(userType);
    useEffect(() => {
        if (sessionState !== '0') { navigate('/'); }
    }, []);

    return (
        <div>
            <Layout>
                <SignIn />
            </Layout>
        </div>
    )
}