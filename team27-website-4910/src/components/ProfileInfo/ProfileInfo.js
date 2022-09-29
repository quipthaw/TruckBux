import { Button, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { Container } from '@mui/system';
import { SessionContext } from '../..';

export const ProfileInfo = () => {
    const { usernameState, setUsernameState } = useContext(SessionContext);

    const DisplayUsername = () => {
        return (
            <TextField  
            id="user"
            label="username"
            value={usernameState}
            fullWidth
            inputProps={
                { disabled: true, }
            }
            />
        );
    };

    const handleChangeUsername = () => {
        
    };

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

                    <DisplayUsername/>
                    <Button variant="text" onClick={(handleChangeUsername)}>Change Username</Button>

                </Box>
            </Paper>
        </Container>
    );
};