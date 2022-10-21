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

    const [ userType, setUserType ] = useState(user.acctType);
    const [ username, setUsername ] = useState(user.username);
    const [ fname, setFname ] = useState(user.fname);
    const [ lname, setLname ] = useState(user.lname);
    const [ email, setEmail ] = useState(user.email);
    const [ bio, setBio ] = useState(user.bio ? user.bio : '');

    const [ selected, setSelected ] = useState(false);
    const [ activeUser, setActiveUser ] = useState(user.username === usernameState);

    //Allows changes when this row is current user's account. Should we display this?
    const setProfile = {
        'setFirstname': activeUser ? setFirstnameState : setFname,
        'setLastname': activeUser ? setLastnameState : setLname,
        'setEmail': activeUser ? setEmailState : setEmail,
        'setBio': activeUser ? setBioState : setBio,
    };

    const userInfo = {
        'userType': userType,
        'username': username,
        'firstname': fname,
        'lastname': lname,
        'email': email,
        'bio': bio,
        'setProfile': setProfile,
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