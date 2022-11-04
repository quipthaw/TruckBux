import React from 'react';
import { Paper, Container, Stack, Box, Typography, Button } from '@mui/material';
import { ProfileEditButton } from '../../ProfileInfo/ProfileEditButton';
import { PointDisplay } from '../../ManagePoints/PointDisplay';

export const UserListRow = (props) => {
  const { driver, refresh, setRefresh } = props;

  return (
    <Paper>
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Box  sx={{ width: '20%'}}>
                    <Typography variant='h6'>{driver.fname + " " + driver.lname}</Typography>
                    <Typography>{"Username: " + driver.username}</Typography>
                    <Typography>{"Type: " + driver.acctType}</Typography>
                </Box>
                <Box sx={{ width: '10%'}}>
                    <ProfileEditButton user={driver}/>
                </Box>
                <Box>
                    <PointDisplay refresh={refresh} user={driver}/>
                </Box>
                <Box  sx={{ width: '5%'}}>
                    <Button>Drop</Button>
                </Box>
            </Stack>
        </Container>
    </Paper>

    
  );
};
