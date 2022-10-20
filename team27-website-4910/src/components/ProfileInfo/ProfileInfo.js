import { Button, Paper, TextField, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { Container } from '@mui/system';
import { SessionContext } from '../..';
import { UpdatePassword } from '../PasswordRecovery/UpdatePassword';
import { AccountDeactivation } from './AccountDeactivation';
import { useNavigate } from 'react-router-dom';

export const ProfileInfo = () => {
    const navigate = useNavigate();

    const {
        sessionState,
        usernameState,
        firstnameState, setFirstnameState,
        lastnameState, setLastnameState,
        emailState, setEmailState,
        bioState, setBioState
    } = useContext(SessionContext);

    const [updatingProfile, setUpdatingProfile] = useState(false);

    const [profileFirstname, setProfileFirstname] = useState(firstnameState);
    const [profileLastname, setProfileLastname] = useState(lastnameState);
    const [profileEmail, setProfileEmail] = useState(emailState);
    const [profileBio, setProfileBio] = useState(bioState);

    const [profileUpdateError, setProfileUpdateError] = useState("");

    //On changes for profile-specific variables - we do not change context here
    const onEmailChange = (e) => {
        setProfileEmail(e.target.value);
    };

    const onFirstnameChange = (e) => {
        setProfileFirstname(e.target.value);
    };

    const onLastnameChange = (e) => {
        setProfileLastname(e.target.value);
    };

    const onUserBioChange = (e) => {
        setProfileBio(e.target.value);
    };

    const toggleUpdatingProfile = () => {
        setUpdatingProfile(updatingProfile ? false : true);
    };

    const handleUpdateProfileInformation = async (e) => {
        e.preventDefault();

        //Send update request to server.
        const profileData = {
            user: usernameState,
            email: profileEmail,
            fname: profileFirstname,
            lname: profileLastname,
            bio: profileBio
        };

        const profileOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        };

        let profileResponse = await fetch('https://ec2-52-205-128-217.compute-1.amazonaws.com:8080/updateprof', profileOptions);

        profileResponse = await profileResponse.json();

        if (profileResponse.error === "False") {
            setEmailState(profileEmail);
            setFirstnameState(profileFirstname);
            setLastnameState(profileLastname);
            setBioState(profileBio);
            setProfileUpdateError("");
            toggleUpdatingProfile();
        }
        else {
            if ('email' in profileResponse) {
                setProfileUpdateError(profileResponse.email);
            }
            else {
                setProfileUpdateError("We were unable to update your profile");
            }
        }
    };

    const DisplayUserType = () => {
        let userTypeMessage = 'Account Type: ';

        if (sessionState === 'A') {
            userTypeMessage = userTypeMessage.concat('Admin');
        }
        else if (sessionState === 'S') {
            userTypeMessage = userTypeMessage.concat('Sponsor');
        }
        else {
            userTypeMessage = userTypeMessage.concat('Driver');
        }

        return (
            <Typography align='center'>{userTypeMessage}</Typography>
        );
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
                    <Stack direction='column' spacing={2} justifyContent='center' alignItems='stretch' alignContent='center'>
                        <DisplayUserType />
                        <Stack direction='row' spacing={2}>
                            <TextField
                                id="username"
                                label="Username"
                                value={usernameState}
                                fullWidth
                                inputProps={
                                    { disabled: true, }
                                }
                            />
                            <TextField
                                id="email"
                                label="Email"
                                value={updatingProfile ? profileEmail : emailState}
                                onChange={(onEmailChange)}
                                fullWidth
                                variant={updatingProfile ? 'filled' : 'outlined'}
                                inputProps={
                                    updatingProfile ? { disabled: false } : { disabled: true, }
                                }
                            />
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <TextField
                                id="firstname"
                                label="First Name"
                                value={updatingProfile ? profileFirstname : firstnameState}
                                onChange={(onFirstnameChange)}
                                fullWidth
                                variant={updatingProfile ? 'filled' : 'outlined'}
                                inputProps={
                                    updatingProfile ? { disabled: false } : { disabled: true, }
                                }
                            />
                            <TextField
                                id="lastname"
                                label="Last Name"
                                value={updatingProfile ? profileLastname : lastnameState}
                                onChange={(onLastnameChange)}
                                fullWidth
                                variant={updatingProfile ? 'filled' : 'outlined'}
                                inputProps={
                                    updatingProfile ? { disabled: false } : { disabled: true, }
                                }
                            />
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <TextField
                                id="userbio"
                                label="Bio"
                                value={updatingProfile ? profileBio : bioState}
                                onChange={(onUserBioChange)}
                                fullWidth
                                variant={updatingProfile ? 'filled' : 'outlined'}
                                inputProps={
                                    updatingProfile ? { disabled: false } : { disabled: true, }
                                }
                            />
                        </Stack>
                        {updatingProfile && profileUpdateError !== '' && <Typography color='red'>{profileUpdateError}</Typography>}
                        {!updatingProfile && <Button variant="text" onClick={(toggleUpdatingProfile)} sx={{ width: '100%' }}>Update Profile</Button>}
                        {updatingProfile && <Button variant="text" onClick={(handleUpdateProfileInformation)} sx={{ width: '100%' }}>Confirm Changes</Button>}
                        <UpdatePassword updatingProfile={updatingProfile} setUpdatingProfile={setUpdatingProfile} />
                        {<AccountDeactivation />}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};