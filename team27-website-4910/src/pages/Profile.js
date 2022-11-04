import React from 'react';
import Layout from '../components/Layout/Layout';
import { ProfileInfo } from '../components/ProfileInfo/ProfileInfo';
import { useRecoilState } from 'recoil';
import {
    userName,
} from '../recoil_atoms';

export default function Profile() {
    const [usernameState, setUsernameState ] = useRecoilState(userName);

    return (
        <div>
            <Layout>
                <ProfileInfo username={usernameState} />
            </Layout>
        </div>
    )
};