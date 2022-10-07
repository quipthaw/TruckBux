import React, { useState } from 'react';
import { Button, TextField, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const AccountDeactivation = () => {
    const [ deactivating, setDeactivating ] = useState(false);

    const toggleDeactivating = () => {
        setDeactivating(deactivating ? false : true);
    };

    return (
        <Stack>
            {!deactivating && <Button variant='outlined' color='error' startIcon={<DeleteIcon/>} onClick={(toggleDeactivating)}>Deactivate Account</Button>}
            {deactivating && <Button variant='outlined'  color='success' onClick={(toggleDeactivating)}>Cancel Account Deactivation</Button>}
        </Stack>
    );
};