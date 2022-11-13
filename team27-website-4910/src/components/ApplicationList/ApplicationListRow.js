import React from 'react';
import { Paper, Container, Stack, Box, Typography, Button } from '@mui/material';
import { PointDisplay } from '../../ManagePoints/PointDisplay';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../../../recoil_atoms';

export const ApplicationListRow = (props) => {
    const { app } = props;

    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sessionState, setSessionState] = useRecoilState(userType);

    const driver = { 'username': usernameState };

    const handleGetApps = () => {
        props.getApps();
    };
    const approveApp = async () => {
        const response = await fetch(`http://127.0.0.1:5000/applications`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: app.username,
                sponsName: app.sponsorName,
                status: 'Approved'
            }),
        });
        handleGetApps();
    };
    const denyApp = async () => {
        const response = await fetch(`http://127.0.0.1:5000/applications`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: app.username,
                sponsName: app.sponsorName,
                status: 'Denied'
            }),
        });
        handleGetApps();
    };
    const cancelApp = async () => {
        const response = await fetch(`http://127.0.0.1:5000/applications`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: app.username,
                sponsName: app.sponsorName,
                status: 'Cancelled'
            }),
        });
        handleGetApps();
    };

    return (
        <Container>
            <Stack direction='row' justifyContent='space-between'>
                <Box>
                    {sessionState === 'S' ? <Typography variant='h6' gutterBottom>{app.username}</Typography> : <Typography variant='h6' gutterBottom>{app.sponsorName}</Typography>}
                    {sessionState === 'S' && <Typography gutterBottom>{app.fname + " " + app.lname}</Typography>}
                    <Typography>{"Status: " + app.status}</Typography>
                    {sessionState === 'D' && <Typography gutterBottom>{app.statusReason}</Typography>}
                    <Typography>{app.date}</Typography>
                </Box>
                <Stack flexDirection='row'>
                    {sessionState === 'S' && <Button onClick={approveApp}>Approve</Button>}
                    {sessionState === 'S' && <Button onClick={denyApp}>Deny</Button>}
                    {sessionState === 'D' && <Button onClick={cancelApp}>Cancel</Button>}
                </Stack>
            </Stack>
        </Container>
    )
};