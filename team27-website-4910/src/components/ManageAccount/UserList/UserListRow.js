import React, { useState } from 'react';
import { Paper, Container, Stack, Box, Typography, Button, Dialog } from '@mui/material';
import { ProfileEditButton } from '../../ProfileInfo/ProfileEditButton';
import { PointDisplay } from '../../ManagePoints/PointDisplay';
import { PointChangeSelectionBox } from '../../ManagePoints/PointChangeSelectionBox';
import ManageAccounts from '../ManageAccounts';

export const UserListRow = (props) => {
  const {
    user,
    userType,
    driver, 
    refresh, 
    selectedDrivers, setSelectedDrivers 
} = props;

console.log(driver)

//userType is passed from ManageAccounts, originally sessionState but can transform
const [ open, setOpen ] = useState(false);

const closeDialog = () => {
    setOpen(false);
};

const openDialog = () => {
    setOpen(true);
};

const PointDialog = () => {
    return (
        <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
            <ManageAccounts user={driver.username} userType={driver?.acctType} />
            <Button onClick={closeDialog}>Close</Button>
        </Dialog>
    );
};

  return (
    <Paper>
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                {userType === 'S' && <Box sx={{ width: '10%'}} align="center">
                    <PointChangeSelectionBox 
                        selectedDrivers={selectedDrivers}
                        setSelectedDrivers={setSelectedDrivers}
                        driver={driver}
                    />
                </Box>}
                <Box  sx={{ width: '20%'}}>
                    <Typography variant='h6'>{driver.fname + " " + driver.lname}</Typography>
                    <Typography>{"Username: " + driver.username}</Typography>
                    <Typography>{"Type: " + driver.acctType}</Typography>
                </Box>
                <Box sx={{ width: '10%'}}>
                    <ProfileEditButton user={driver}/>
                </Box>
                {userType === 'S' && <Box sx={{ width: '10%'}}>
                    <PointDisplay refresh={refresh} driver={driver} user={user}/>
                </Box>}
                {userType === 'S' && <Box  sx={{ width: '5%'}}>
                    <Button>Drop</Button>
                </Box>}
                {userType === 'A' && <Button variant="outlined" onClick={openDialog}>Manage Points</Button>}
                {userType === 'A' && <PointDialog/>}
            </Stack>
        </Container>
    </Paper>

    
  );
};
