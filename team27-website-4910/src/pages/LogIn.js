import React, { useState } from 'react';
import Layout from '../components/Layout';
import { SignIn } from '../components/SignIn/SignIn';

export default function LogIn() {
    return (
        <div>
            <Layout>
                <SignIn/>
            </Layout>
        </div>
    )
}