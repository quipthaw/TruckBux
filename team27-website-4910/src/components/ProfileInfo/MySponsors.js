import { Button, Paper, TextField, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Container } from '@mui/system';
import { UpdatePassword } from '../PasswordRecovery/UpdatePassword';
import { AccountDeactivation } from './AccountDeactivation';

export const MySponsors = (props) => {
    const { sponsorList } = props;

    //TODO: Fetch sponsor organizations/data for user
    //We likely want to fetch orgname, points with org, WHERE sponsor active = true
    //Need to add a way for drivers to drop sponsors from the list
    //This may need to be moved to its own page instead of being used in profile

    return (
        <Stack direction='column' spacing={2}>
            <Typography align='center'>Sponsors:</Typography>
            <Typography align='center'>{sponsorList}</Typography>
        </Stack>
    );
};