import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { userType } from '../recoil_atoms';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PurchaseHistory } from '../components/PurchaseHistory/PurchaseHistory';

export default function PurchaseHistoryPage() {

    const navigate = useNavigate();
    const [sessionState, setSessionState] = useRecoilState(userType);
    useEffect(() => {
        if (sessionState === '0') { navigate('/'); }
    }, []);

    return (
        <div>
            <Layout>
                <PurchaseHistory/>
            </Layout>
        </div>
    )
}