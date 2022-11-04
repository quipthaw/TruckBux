import { Button, Paper, TextField, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { UpdatePassword } from '../PasswordRecovery/UpdatePassword';
import { AccountDeactivation } from './AccountDeactivation';

export const ProfileInfo = (props) => {
  const { username } = props;
  const [ updatingProfile, setUpdatingProfile ] = useState(false);
  const [ updatingError, setUpdatingError ] = useState('');

  //Information of the user. This information is not 
  //changed until the user confirms account changes.
  const [ profileInfo, setProfileInfo ] = useState({
    //acctType: ''
    //active: '1'
    //bio: ''
    //dateCreated: ''
    //email: ''
    //fName: ''
    //lName: ''
    //lockedUntil: ''
    //username: ''
  });

  //Information that is displayed on the profile page. 
  //This changes as input is given by the user.
  const [ editProfileInfo, setEditProfileInfo ] = useState({
    //acctType: ''
    //active: '1'
    //bio: ''
    //dateCreated: ''
    //email: ''
    //fName: ''
    //lName: ''
    //lockedUntil: ''
    //username: ''
  })

  const assignProfile = (result) => {
    const newProfileInfo = {...result.user[0]};

    setProfileInfo(newProfileInfo);
    setEditProfileInfo(newProfileInfo);
  };

  const getProfileInformation = async () => {
    const profileData = { user: username };
    const profileOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
    };

    const profileResponse = await fetch('http://127.0.0.1:5000/getprofile', profileOptions);
    const result = await profileResponse.json();

    assignProfile(result);
  }

  const requestProfileUpdate = async () => {
    const data = {
      user: editProfileInfo.username,
      email: editProfileInfo.email,
      fname: editProfileInfo.fName,
      lname: editProfileInfo.lName,
      bio: editProfileInfo.bio,
    }

    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('http://127.0.0.1:5000/updateprof', options);
    const result = await response.json();

    if(result.error === "False") {
      setProfileInfo(() => {
        const newProfileInfo = {...editProfileInfo};
        return newProfileInfo;
      });
      setUpdatingError('');
      updatingProfileOff();
    }
    else {
      if ('email' in result) {
        setUpdatingError(result.email);
      }
      else {
        setUpdatingError("We were unable to update your profile");
      }
    }
  }

  useEffect(() => {
    getProfileInformation();
  }, [])

  const resetEditProfileInfo = () => {
    setEditProfileInfo(() => {
      const newEditProfileInfo = {...profileInfo};

      return newEditProfileInfo;
    })
  }

  const updatingProfileOn = () => {
    setUpdatingProfile(true);
  }

  const updatingProfileOff = () => {
    resetEditProfileInfo();
    setUpdatingProfile(false);
  }

  const onEmailChange = (e) => {
    setEditProfileInfo((prevEditInfo) => {
      const newEditProfileInfo = {...prevEditInfo};
      newEditProfileInfo.email = e.target.value;
      
      return newEditProfileInfo;
    })
  };

  const onFirstnameChange = (e) => {
    setEditProfileInfo((prevEditInfo) => {
      const newEditProfileInfo = {...prevEditInfo};
      newEditProfileInfo.fName = e.target.value;
      
      return newEditProfileInfo;
    })
  };

  const onLastnameChange = (e) => {
    setEditProfileInfo((prevEditInfo) => {
      const newEditProfileInfo = {...prevEditInfo};
      newEditProfileInfo.lName = e.target.value;
      
      return newEditProfileInfo;
    })
  };

  const onBioChange = (e) => {
    setEditProfileInfo((prevEditInfo) => {
      const newEditProfileInfo = {...prevEditInfo};
      newEditProfileInfo.bio = e.target.value;
      
      return newEditProfileInfo;
    })
  };

  const EditButtons = () => {
    return (
      <Stack direction="row" spacing={2}>
        {!updatingProfile && <Button variant="text" onClick={(updatingProfileOn)} sx={{ width: '100%' }}>Update Profile</Button>}
        {updatingProfile && <Button variant="text" onClick={(requestProfileUpdate)} sx={{ width: '50%' }}>Confirm Changes</Button>}
        {updatingProfile && <Button variant="text" onClick={(updatingProfileOff)} sx={{ width: '50%' }}>Cancel Changes</Button>}
      </Stack>
    );
  };

  const DisplayUserType = () => {
    let acctType = "Driver";

    if(profileInfo.acctType === 'A') {
      acctType = "Admin";
    }
    else if(profileInfo.acctType === 'S') {
      acctType = "Sponsor"
    }

    const userTypeMessage = `Account Type: ${acctType}`;
    return (
        <Typography align='center'>{userTypeMessage}</Typography>
    );
  };

  return (
    <Container sx={{ width: '90% ', display: 'flex', marginY: '5vh' }}>
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ height: '100%', width: '100%', padding: '25px' }}>
          <Stack direction="column" spacing={2}>
            
            <DisplayUserType />
            
            <Stack direction="row" spacing={2}>

              <TextField
                disabled
                id="username"
                label="Username"
                value={editProfileInfo.username}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                disabled={!updatingProfile}
                id="email"
                label="Email"
                value={updatingProfile ? editProfileInfo.email : profileInfo.email}
                onChange={(onEmailChange)}
                fullWidth
                variant={updatingProfile ? 'filled' : 'outlined'}
                InputLabelProps={{ shrink: true }}
              />

            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                disabled={!updatingProfile}
                id="firstname"
                label="First Name"
                value={updatingProfile ? editProfileInfo.fName : profileInfo.fName}
                onChange={(onFirstnameChange)}
                fullWidth
                variant={updatingProfile ? 'filled' : 'outlined'}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                disabled={!updatingProfile}
                id="lastname"
                label="Last Name"
                value={updatingProfile ? editProfileInfo.lName : profileInfo.lName}
                onChange={(onLastnameChange)}
                fullWidth
                variant={updatingProfile ? 'filled' : 'outlined'}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>

            <Stack direction='row' spacing={2}>
              <TextField
                disabled={!updatingProfile}
                id="userbio"
                label="Bio"
                value={updatingProfile ? editProfileInfo.bio : profileInfo.bio}
                onChange={(onBioChange)}
                fullWidth
                variant={updatingProfile ? 'filled' : 'outlined'}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>

            {updatingProfile && updatingError !== '' && <Typography align="center" color='red'>{updatingError}</Typography>}
            <EditButtons/>
            <UpdatePassword 
              username={profileInfo.username}
              firstname={profileInfo.fName}
              lastname={profileInfo.lName}
              email={profileInfo.email}
            />
            <AccountDeactivation active={profileInfo.active} username={profileInfo.username} setProfileInfo={setProfileInfo}/>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};