import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';

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

        setSponsors(result.accounts);
        setNumSponsors(result.accounts.length);
        setLoading(false);
    };

    const getSponsors = async () => {
        const responseURL = `http://127.0.0.1:5000/sponsors`
        const response = await fetch(responseURL);
        const result = await response.json();

        console.log(result)
        setSponsors(result.sponsors);
        setNumSponsors(result.number);
        setLoading(false);
    };

    useEffect(() => {
        getSponsors();
        getMySponsors();
    }, []);

    return (
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack spacing={2}>
                    <Typography variant='h3' gutterBottom>My Sponsors</Typography>
                    <Paper>
                        <Container>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Box>
                                    <Typography variant='h6' gutterBottom>Mock MySponsor</Typography>
                                    <Typography>***STATIC VALUE GET FROM DB WHEN TABLE IS READY***</Typography>
                                    <Typography>{"ID: " + '1010101'}</Typography>
                                    <Typography>{"Conversion Rate: " + '0.75'}</Typography>
                                </Box>
                                <Box>
                                    <Button>Drop</Button>
                                </Box>
                            </Stack>
                        </Container>
                    </Paper>
                    <Typography variant='h3' gutterBottom>Other Sponsors</Typography>
                    {sponsors.map((sponsor) => {
                        return (
                            <Paper>
                                <Container>
                                    <Stack direction='row' justifyContent='space-between'>
                                        <Box>
                                            <Typography variant='h6' gutterBottom>{sponsor.sponsorName}</Typography>
                                            <Typography>{"ID: " + sponsor.sponsorID}</Typography>
                                            <Typography>{"Conversion Rate: " + sponsor.pointConversionRate}</Typography>
                                        </Box>
                                        <Button>Apply</Button>
                                    </Stack>
                                </Container>
                            </Paper>
                        )
                    })}
                </Stack>
            }
        </Layout>
    )
}
