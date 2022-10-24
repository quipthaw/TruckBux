import { Button, Paper, TextField, Stack, Typography, getListSubheaderUtilityClass } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { SessionContext } from '../..';
import { useNavigate } from 'react-router-dom';
import { UserList } from './UserList';

export const ManageAccount = () => {

    const { usernameState } = useContext(SessionContext);
    const [ userList, setUserList ] = useState(null);
    
    const DisplayUser = () => {
        return (
            <Typography align='center'>{usernameState}</Typography>
        );
    }

    const getRelatedUsers = async () => {
        const relatedUsersData = { accountName: usernameState };

        const relatedUsersOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(relatedUsersData)
        };

        let response = await fetch('http://127.0.0.1:5000/relateddrivers', relatedUsersOptions);
        response = await response.json();

        setUserList(response.accounts);
    }

    useEffect(() => {
        getRelatedUsers();
    }, []);

    return (
        <Container sx={{
            width: '90% ',
            display: 'flex',
            marginY: '5vh'
        }}>
            <Paper sx={{ width: '100%' }}> 
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    padding: '25px'
                }}>
                    <Stack direction='column' spacing={2}>
                        <DisplayUser/>
                        {/*<UserSearch/>*/}
                        {userList && <UserList userList={userList}/>}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};