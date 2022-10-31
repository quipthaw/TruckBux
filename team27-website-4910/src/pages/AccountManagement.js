import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { ManageAccount } from '../components/ManageAccount/ManageAccounts';
import { useRecoilState } from 'recoil';
import {
    userType,
} from '../recoil_atoms';

export default function AccountManagement() {
    const navigate = useNavigate();
    const [sessionState, setSessionState] = useRecoilState(userType);

    useEffect(() => {
        if (sessionState === '0') {
            navigate('/');
        }
    }, [sessionState, navigate]);

    return (
        <div>
            <Layout>
                <ManageAccount />
            </Layout>
        </div>
    )
};