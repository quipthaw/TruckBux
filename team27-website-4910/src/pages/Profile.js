import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { SessionContext } from '..';

export default function Profile() {
    return (
        <div>
            <Layout>
                <ProfileInfo/>
            </Layout>
        </div>
    )
};