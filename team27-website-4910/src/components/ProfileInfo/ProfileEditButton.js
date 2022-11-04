import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { ProfileInfo } from './ProfileInfo';
import { useRecoilState } from 'recoil';
import {
    userType,
    userName,
    userFName,
    userLName,
    userEmail,
    userBio
} from '../../recoil_atoms';

export const ProfileEditButton = (props) => {

    const { usernameState } = useRecoilState(userName);
    const { user } = props;

    const [selected, setSelected] = useState(false);

    const openDialog = () => {
        setSelected(true);
    };

    const closeDialog = () => {
        setSelected(false);
    };

    return (
        <Stack direction="column" spacing={2}>
            {!selected && <Button variant="outlined" onClick={openDialog}>Edit Profile</Button>}
            {selected &&
                <Dialog open={selected} onClose={closeDialog}>
                    <ProfileInfo username={user.username} />
                    <DialogActions>
                        <Button variant="text" onClick={closeDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            }
        </Stack>
    );
};