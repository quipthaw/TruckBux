import { Button, Paper, TextField, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { Container } from '@mui/system';
import { SessionContext } from '../..';
import { useNavigate } from 'react-router-dom';
import { UserListRow } from './UserListRow';

export const UserList = (props) => {

    const { userList } = props;

    const renderUserList = () => {
        const userListRows = userList.map((user) => {
            return (
                <UserListRow key={user.username} user={user}/>
            );
        });

        return userListRows
    };

    return (
        <Stack direction='column' spacing={2}>
            {renderUserList()}    
        </Stack>
    );
};