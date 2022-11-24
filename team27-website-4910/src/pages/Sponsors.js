import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import { MySponsorList } from '../components/ManageAccount/MySponsorList/MySponsorList';
import { ApplicationList } from '../components/ApplicationList/ApplicationList';
import { ConversionRateChange } from '../components/ManageAccount/ConversionRateChange';


export default function Register() {
    const [loading, setLoading] = React.useState(true);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sessionState, setSessionState] = useRecoilState(userType);

    const [sponsors, setSponsors] = React.useState();
    const [mySponsors, setMySponsors] = React.useState([]);

    const [applications, setApplications] = React.useState();

    const getSponsors = async () => {
        const responseURL = sessionState === '0' ? `http://127.0.0.1:5000/sponsors` : `http://127.0.0.1:5000/sponsors?user=${usernameState}`;
        const response = await fetch(responseURL);
        const result = await response.json();

        setMySponsors(result.relatedSponsors);
        setSponsors(result.otherSponsors);
    };

    const getApps = async () => {
        const getRequestURL = `http://127.0.0.1:5000/applications?user=${usernameState}`
        const response = await fetch(getRequestURL);
        const result = await response.json();

        setApplications(result.apps);
    };

    const getPageInfo = async () => {
        await getApps();
        await getSponsors();
        setLoading(false);
    };

    useEffect(() => {
        getPageInfo();
    }, []);

    const renderList = () => {
        if (sessionState === 'D') {
            return (
                <Stack spacing={2}>
                    <Typography variant='h3' gutterBottom>My Sponsors</Typography>
                    <MySponsorList getSponsors={getPageInfo} sponsorList={mySponsors} showPoints={true} />

                    <Typography variant='h3' gutterBottom>My Applications</Typography>
                    <ApplicationList getApps={getPageInfo} appList={applications} />

                    <Typography variant='h3' gutterBottom>Other Sponsors</Typography>
                    <MySponsorList getSponsors={getPageInfo} sponsorList={sponsors} showPoints={false} />
                </Stack>
            )
        } else {
            return (
                <Stack spacing={2}>
                    <Typography variant='h3' gutterBottom>Sponsors</Typography>
                    <MySponsorList getSponsors={getPageInfo} sponsorList={sponsors} showPoints={false} />
                </Stack>
            )

        }

    };

    return (
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack direction="column" spacing={2}>
                    <ConversionRateChange/>
                    {renderList()}
                </Stack>
            }
        </Layout>
    )
}
