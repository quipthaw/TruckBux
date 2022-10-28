import React from 'react';
import Layout from '../components/Layout';
import { ManageAccount } from '../components/ManageAccount/ManageAccounts';

export default function AccountManagement() {
    return (
        <div>
            <Layout>
                <ManageAccount/>
            </Layout>
        </div>
    )
};