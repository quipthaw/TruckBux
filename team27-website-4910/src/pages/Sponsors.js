import { CircularProgress, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName } from '../recoil_atoms';
import { MySponsorList } from '../components/ManageAccount/MySponsorList/MySponsorList';

export default function Register() {
    const [loading, setLoading] = React.useState(true);
    const [ usernameState, setUsernameState ] = useRecoilState(userName);

    const [sponsors, setSponsors] = React.useState();
    const [numSponsors, setNumSponsors] = React.useState();

    //Mock MySponsors List. This should be populated when getting a driver's
    //sponsors from the database.
    const [ mySponsors, setMySponsors ] = React.useState([]);

    const getMySponsors = async () => {
        const responseURL = `http://127.0.0.1:5000/sponsors?user=${usernameState}`
        const response = await fetch(responseURL);
        const result = await response.json();

        setMySponsors(result.accounts);
        setNumSponsors(result.accounts.length);
    };

    const getSponsors = async () => {
        const responseURL = `http://127.0.0.1:5000/sponsors`
        const response = await fetch(responseURL);
        const result = await response.json();

        setSponsors(result.sponsors);
        setNumSponsors(result.number);
        setLoading(false);
    };

    useEffect(() => {
        getMySponsors();
        getSponsors();
    }, []);

    return (
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack spacing={2}>
                    <Typography variant='h3' gutterBottom>My Sponsors</Typography>
                    <MySponsorList sponsorList={mySponsors} showPoints={true}/>
                    
                    <Typography variant='h3' gutterBottom>Other Sponsors</Typography>
                    <MySponsorList sponsorList={sponsors} showPoints={false}/>
                </Stack>
            }
        </Layout>
    )
}
