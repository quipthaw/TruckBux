import { Stack } from '@mui/material';
import React from 'react';
import { DriversUserRow } from './UserListRow';
//import { UserListRow } from './UserListRow';

export const UserList = (props) => {

    const { userList } = props;

    const renderUserList = () => {
        const userListRows = userList.map((user) => {
            return (
                <DriversUserRow key={user.username} driver={user}/>
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