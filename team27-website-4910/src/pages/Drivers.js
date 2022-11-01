import { CircularProgress, Paper, Typography, Box, Button } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

export default function Register() {
    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();
    const getDrivers = async () => {
        const response = await fetch('https://team27.cpsc4911.com/relateddrivers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accountName: "AdminTest"
            }),
        });
        const result = await response.json();
        setDrivers(result.accounts);
        setLoading(false);
    };

    useEffect(() => {
        getDrivers()
    }, []);

    return (
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack spacing={2}>
                    <Typography variant='h3' gutterBottom>Applications</Typography>
                    <Paper>
                        <Container>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Box>
                                    <Typography variant='h6'>Static Test</Typography>
                                    <Typography>{"Username: " + 'StaticUser_CHANGE'}</Typography>
                                    <Typography>{"Application Date: " + '10/31/2022'}</Typography>
                                </Box>
                                <Box>
                                    <Button>Accept</Button>
                                    <Button>Deny</Button>
                                </Box>
                            </Stack>
                        </Container>
                    </Paper>
                    <Typography variant='h3' gutterBottom>My Drivers</Typography>
                    {drivers.map((driver) => {
                        return (
                            <Paper>
                                <Container>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Box>
                                            <Typography variant='h6'>{driver.fname + " " + driver.lname}</Typography>
                                            <Typography>{"Username: " + driver.username}</Typography>
                                            <Typography>{"Type: " + driver.acctType}</Typography>
                                        </Box>
                                        <Box>
                                            <Button>Drop</Button>
                                        </Box>
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