import React, { useContext, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { SessionContext } from '../..';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';

export const UserListRow = (props) => {

    const {
        usernameState, 
        setFirstnameState,
        setLastnameState,
        setEmailState,
        setBioState
    } = useContext(SessionContext);

    /* user format:
        acctType
        active
        bio
        dateCreated
        email
        fname
        lname
        username
    */
    const { user } = props;
    const [ selected, setSelected ] = useState(false);
    const [ activeUser, setActiveUser ] = useState(user.username === usernameState);

    //Allows changes when this row is current user's account. Should we display this?
    const setProfile = {
        'setFirstname': setFirstnameState,
        'setLastname': setLastnameState,
        'setEmail': setEmailState,
        'setBio': setBioState,
    };

    const userInfo = {
        'userType': user.acctType,
        'username': user.username,
        'firstname': user.fname,
        'lastname': user.lname,
        'email': user.email,
        'bio': user.bio ? user.bio : '',
        'setProfile': activeUser ? setProfile : null,
    };

    const openDialog = () => {
        setSelected(true);
    };

    const closeDialog = () => {
        setSelected(false);
    };

    return (
        <Stack direction="column" spacing={2}>
            {!selected && <Button variant="outlined" onClick={openDialog} sx={{width: '100%'}}>{user.username}</Button>}
            {selected &&
                <Dialog open={selected} onClose={closeDialog}>
                    <ProfileInfo userInfo={userInfo}/>
                    <DialogActions>
                        <Button variant="text" onClick={closeDialog}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            }
        </Stack>
    );
};