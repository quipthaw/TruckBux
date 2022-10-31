import { Stack } from '@mui/material';
import React from 'react';
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