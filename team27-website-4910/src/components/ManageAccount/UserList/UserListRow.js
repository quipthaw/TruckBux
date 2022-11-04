import React from 'react';
import { Paper, Container, Stack, Box, Typography, Button } from '@mui/material';
import { ProfileEditButton } from '../../ProfileInfo/ProfileEditButton';

export const DriversUserRow = (props) => {
  const { driver } = props;

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
                <Box  sx={{ width: '5%'}}>
                    <Button>Drop</Button>
                </Box>
            </Stack>
        </Container>
    </Paper>

    
  );
};
