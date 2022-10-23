import { Button, Paper, TextField, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Container } from '@mui/system';
import { UpdatePassword } from '../PasswordRecovery/UpdatePassword';
import { AccountDeactivation } from './AccountDeactivation';

export const ProfileInfo = (props) => {

    const { userInfo } = props;

    const [ updatingProfile, setUpdatingProfile ] = useState(false);

    const [ profileUsername, setProfileUsername ] = useState (userInfo.username);
    const [ profileFirstname, setProfileFirstname ] = useState(userInfo.firstname);
    const [ profileLastname, setProfileLastname ] = useState(userInfo.lastname);
    const [ profileEmail, setProfileEmail ] = useState(userInfo.email);
    const [ profileBio, setProfileBio ] = useState(userInfo.bio);

    const [ profileUpdateError, setProfileUpdateError ] = useState("");

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
            user: profileUsername,
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

        let profileResponse = await fetch('http://127.0.0.1:5000/updateprof', profileOptions);
        
        profileResponse = await profileResponse.json();

        if(profileResponse.error === "False") {
            userInfo.setProfile.setEmail(profileEmail);
            userInfo.setProfile.setFirstname(profileFirstname);
            userInfo.setProfile.setLastname(profileLastname);
            userInfo.setProfile.setBio(profileBio);
            setProfileUpdateError("");
            toggleUpdatingProfile();
        }
        else {
            if('email' in profileResponse) {
                setProfileUpdateError(profileResponse.email);
            }
            else {
                setProfileUpdateError("We were unable to update your profile");
            }
        }
    };

    const DisplayUserType = () => {
        let userTypeMessage = 'Account Type: ';

        if(userInfo.userType === 'A') {
            userTypeMessage = userTypeMessage.concat('Admin');
        }
        else if(userInfo.userType === 'S') {
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
                        <DisplayUserType/>
                        <Stack direction='row' spacing={2}>
                            <TextField      
                                id="username"   
                                label="Username"
                                value={userInfo.username}
                                fullWidth
                                inputProps={
                                    { disabled: true, }
                                }
                            />
                            <TextField      
                                id="email"   
                                label="Email"
                                value={updatingProfile ? profileEmail : userInfo.email}
                                onChange={(onEmailChange)}
                                fullWidth
                                variant={ updatingProfile ? 'filled' : 'outlined' }
                                inputProps={
                                    updatingProfile ? {disabled: false} : { disabled: true, }
                                }
                            />
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <TextField      
                                id="firstname"   
                                label="First Name"
                                value={updatingProfile ? profileFirstname : userInfo.firstname}
                                onChange={(onFirstnameChange)}
                                fullWidth
                                variant={ updatingProfile ? 'filled' : 'outlined' }
                                inputProps={
                                    updatingProfile ? {disabled: false} : { disabled: true, }
                                }
                            />
                            <TextField      
                                id="lastname"   
                                label="Last Name"
                                value={updatingProfile ? profileLastname : userInfo.lastname}
                                onChange={(onLastnameChange)}
                                fullWidth
                                variant={ updatingProfile ? 'filled' : 'outlined' }
                                inputProps={
                                    updatingProfile ? {disabled: false} : { disabled: true, }
                                }
                            />
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <TextField      
                                id="userbio"   
                                label="Bio"
                                value={updatingProfile ? profileBio : userInfo.bio}
                                onChange={(onUserBioChange)}
                                fullWidth
                                variant={ updatingProfile ? 'filled' : 'outlined' }
                                inputProps={
                                    updatingProfile ? {disabled: false} : { disabled: true, }
                                }
                            />
                        </Stack>
                        {updatingProfile && profileUpdateError !== '' && <Typography color='red'>{profileUpdateError}</Typography>}
                        {!updatingProfile && <Button variant="text" onClick={(toggleUpdatingProfile)} sx={{ width: '100%' }}>Update Profile</Button>}
                        {updatingProfile && <Button variant="text" onClick={(handleUpdateProfileInformation)} sx={{ width: '100%' }}>Confirm Changes</Button>}
                        <UpdatePassword userInfo={userInfo} updatingProfile={updatingProfile} setUpdatingProfile={setUpdatingProfile}/>
                        {<AccountDeactivation userInfo={userInfo}/>}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};