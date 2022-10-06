import { Button, Paper, TextField, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { Container } from '@mui/system';
import { SessionContext } from '../..';

export const ProfileInfo = () => {
    const {
        usernameState, 
        firstnameState, setFirstnameState,
        lastnameState, setLastnameState,
        emailState, setEmailState,
        bioState, setBioState
    } = useContext(SessionContext);

    const [ updatingProfile, setUpdatingProfile ] = useState(false);

    const [ profileFirstname, setProfileFirstname ] = useState(firstnameState);
    const [ profileLastname, setProfileLastname ] = useState(lastnameState);
    const [ profileEmail, setProfileEmail ] = useState(emailState);
    const [ profileBio, setProfileBio ] = useState(bioState);

    const [ profileUpdateError, setProfileUpdateError ] = useState("");

    console.log(profileFirstname);
    console.log(firstnameState);

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

    //TODO
    //Make a call to database, handle verification, update changes.
    //IF UPDATE SUCCESSFUL, then update our contexts,
    //ELSE warning
    const handleUpdateProfileInformation = async (e) => {
        e.preventDefault();
        
        //Send update request to server.
        const profileData = {
            user: usernameState,
            email: profileEmail,
            fname: profileFirstname, 
            lname: profileLastname,
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
            setEmailState(profileEmail);
            setFirstnameState(profileFirstname);
            setLastnameState(profileLastname);
            setBioState(profileBio);
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
                        <Stack direction='row' spacing={2}>
                        <TextField      
                            id="username"   
                            label="username"
                            value={usernameState}
                            fullWidth
                            inputProps={
                                { disabled: true, }
                            }
                        />
                        <TextField      
                            id="email"   
                            label="email"
                            value={updatingProfile ? profileEmail : emailState}
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
                            label="firstname"
                            value={updatingProfile ? profileFirstname : firstnameState}
                            onChange={(onFirstnameChange)}
                            fullWidth
                            variant={ updatingProfile ? 'filled' : 'outlined' }
                            inputProps={
                                updatingProfile ? {disabled: false} : { disabled: true, }
                            }
                        />
                        <TextField      
                            id="lastname"   
                            label="lastname"
                            value={updatingProfile ? profileLastname : lastnameState}
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
                            label="userbio"
                            value={updatingProfile ? profileBio : bioState}
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
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};