import React from 'react';
import { Paper, Container, Stack, Box, Typography, Button } from '@mui/material'

export const DriverApplicationsList = (props) => {
    return (
        <Paper>
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Box>
                    <Typography variant='h6'>Static Test</Typography>
                    <Typography>{"Username: " + 'StaticUser_CHANGE'}</Typography>
                    <Typography>{"Application Date: " + '10/31/2022'}</Typography>
                </Box>
                <Box>
                    <Button>Accept</Button>
                    <Button>Deny</Button>
                </Box>
            </Stack>
        </Container>
        </Paper>
    )
}