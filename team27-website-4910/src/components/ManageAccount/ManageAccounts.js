import { Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { UserList } from './UserList/UserList';
import { useRecoilState } from 'recoil';
import {
    userType,
    userName,
    userFName,
    userLName,
    userEmail
} from '../../recoil_atoms';

export const ManageAccount = () => {

    const [sessionState, setSessionState] = useRecoilState(userType);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [firstnameState, setFirstnameState] = useRecoilState(userFName);
    const [lastnameState, setLastnameState] = useRecoilState(userLName);
    const [emailState, setEmailState] = useRecoilState(userEmail);
    const [userList, setUserList] = useState(null);

    const DisplayUser = () => {
        return (
            <Typography align='center'>{usernameState}</Typography>
        );
    }

    const getRelatedUsers = async () => {
        /*
        const relatedUsersData = { accountName: usernameState };

        const relatedUsersOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(relatedUsersData)
        };

        let response = await fetch('http://127.0.0.1:5000/relateddrivers', relatedUsersOptions);
        */
        const responseURL = `http://127.0.0.1:5000/sponsors?sponsName=${usernameState}`;
        const response = await fetch(responseURL);
        const result = await response.json();

        setUserList(result.accounts);
    }

    useEffect(() => {
        if (sessionState !== '0') {
            getRelatedUsers();
        }
    }, [sessionState]);

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
                        <DisplayUser />
                        {/*<UserSearch/>*/}
                        {userList && <UserList userList={userList} />}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};