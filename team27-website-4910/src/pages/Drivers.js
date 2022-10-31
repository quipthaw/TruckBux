import { CircularProgress, Paper, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

export default function Register() {
    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();
    const getDrivers = async () => {
        const response = await fetch('http://127.0.0.1:5000/relateddrivers', {
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
                    {drivers.map((driver) => {
                        return (
                            <Paper>
                                <Container>
                                    <Typography gutterBottom>{"Name: " + driver.fname + " " + driver.lname}</Typography>
                                    <Typography>{"User: " + driver.username}</Typography>
                                    <Typography>{"Type: " + driver.acctType}</Typography>
                                </Container>
                            </Paper>
                        )
                    })}
                </Stack>
            }
        </Layout>
    )
}