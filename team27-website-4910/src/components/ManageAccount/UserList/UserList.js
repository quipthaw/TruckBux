import { Stack } from '@mui/material';
import React from 'react';
import { UserListRow } from './UserListRow';

export const UserList = (props) => {

    const { userList, refresh, setRefresh } = props;

    const renderUserList = () => {
        const userListRows = userList.map((user) => {
            return (
                <UserListRow refresh={refresh} setRefresh={setRefresh} key={user.username} driver={user}/>
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