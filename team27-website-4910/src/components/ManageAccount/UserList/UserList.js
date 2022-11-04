import { Stack, FormGroup, FormControlLabel, Checkbox, Paper, Container, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { UserListRow } from './UserListRow';

export const UserList = (props) => {
    const { 
        selectAllDrivers,
        userList, 
        refresh, setRefresh, 
        selectedDrivers, setSelectedDrivers 
    } = props;

    const [ isSelected, setIsSelected ] = React.useState(false);
    
    const handleSelection = (e) => {
        selectAllDrivers();
    };

    useEffect(() => {
        setIsSelected(selectedDrivers.length === userList.length)
    }, [selectedDrivers]);

    const renderUserList = () => {
        const userListRows = userList.map((user) => {
            return (
                <UserListRow 
                    selectedDrivers={selectedDrivers}
                    setSelectedDrivers={setSelectedDrivers}
                    refresh={refresh} 
                    setRefresh={setRefresh} 
                    key={user.username} 
                    driver={user}
                />
            );
        });

        return userListRows
    };

    return (
        <Stack direction='column' spacing={2}>
            <Paper>
                <Container>
                    <Stack direction='row' alignItems='center'>
                        <Box sx={{ width: '10%'}} align="center">
                            <Typography>Select All</Typography>
                            <FormGroup  sx={{ width: '5%'}}>
                                <FormControlLabel
                                control={<Checkbox checked={isSelected} onChange={handleSelection}/>}
                                />
                            </FormGroup>
                        </Box>
                    </Stack>
                </Container>
            </Paper>
            {renderUserList()}
        </Stack>
    );
};