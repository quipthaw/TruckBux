import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Register() {
    const [loading, setLoading] = React.useState(true);

    const [sponsors, setSponsors] = React.useState();
    const [numSponsors, setNumSponsors] = React.useState();
    const getSponsors = async () => {
        const response = await fetch('http://127.0.0.1:5000/getsponsors');
        const result = await response.json();
        console.log(result)
        setSponsors(result.sponsors);
        setNumSponsors(result.number);
        setLoading(false);
    };

    useEffect(() => {
        getSponsors()
    }, []);

    return (
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack spacing={2}>
                    <Typography>{"Number of Active Sponsors: " + numSponsors}</Typography>
                    {sponsors.map((sponsor) => {
                        return (
                            <Paper>
                                <Container>
                                    <Typography gutterBottom>{"Name: " + sponsor.sponsorName}</Typography>
                                    <Typography>{"ID: " + sponsor.sponsorID}</Typography>
                                    <Typography>{"Conversion Rate: " + sponsor.pointConversionRate}</Typography>
                                    <Button>Apply</Button>
                                    <Button>Drop</Button>
                                    <Button>View Catalog</Button>
                                </Container>
                            </Paper>
                        )
                    })}
                </Stack>
            }
        </Layout>
    )
}
