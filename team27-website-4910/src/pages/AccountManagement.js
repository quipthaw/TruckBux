import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '..';
import Layout from '../components/Layout';
import { ManageAccount } from '../components/ManageAccount/ManageAccounts';

export default function AccountManagement() {
    const navigate = useNavigate();
    const { sessionState } = useContext(SessionContext);

    useEffect(() => {
        if(sessionState === '0') {
            navigate('/');
        }
    }, [sessionState, navigate]);

    return (
        <div>
            <Layout>
                <ManageAccount/>
            </Layout>
        </div>
    )
};