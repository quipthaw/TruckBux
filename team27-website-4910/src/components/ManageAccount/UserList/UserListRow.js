import React, { useEffect, useState } from 'react';
import { Paper, Container, Stack, Box, Typography, Button, Dialog, FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { ProfileEditButton } from '../../ProfileInfo/ProfileEditButton';
import { PointDisplay } from '../../ManagePoints/PointDisplay';
import { PointChangeSelectionBox } from '../../ManagePoints/PointChangeSelectionBox';
import ManageAccounts from '../ManageAccounts';
import { userName } from '../../../recoil_atoms';
import { useRecoilState } from 'recoil';

export const UserListRow = (props) => {
    const {
        user,
        userType,
        driver,
        refresh, setRefresh,
        orgList,
        selectedDrivers, setSelectedDrivers
    } = props;

    //userType is passed from ManageAccounts, originally sessionState but can transform
    const [open, setOpen] = useState(false);
    const [chosenSponsor, setChosenSponsor] = useState('');
    const [AddToSponsorFlag, setAddToSponsorFlag] = useState(false);
    const [error, setError] = useState('');
    const isAdminUser = userType === 'A' ? true : false;

    const [usernameState, setUsernameState] = useRecoilState(userName);

    const closeDialog = () => {
        setOpen(false);
    };

    const openDialog = () => {
        setOpen(true);
    };

    const AddToSponsor = () => {
        return (
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="sponsor-select-label">Sponsor</InputLabel>
                    <Select
                        labelId="sponsor-select-label"
                        id="sponsor-select"
                        value={chosenSponsor}
                        label="Sponsor"
                        onChange={(e) => { setChosenSponsor(e.target.value) }}
                    >
                        {
                            orgList.map((sponsor) => {
                                return (
                                    <MenuItem value={sponsor.sponsorName}>{sponsor.sponsorName}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText error={error !== ''}>{error !== '' ? error : "Select a sponsor to add the driver to!"}</FormHelperText>
                </FormControl>
                <Button onClick={sendSponsorShip}>Submit</Button>
                <Button onClick={() => setAddToSponsorFlag(false)}>Cancel</Button>
            </Box>
        )
    };

    const handleGetPage = () => {
        props.getPage();
    };

    const sendSponsorShip = async () => {
        const response = await fetch('https://team27.cpsc4911.com/sponsorships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: driver.username,
                sponsor: chosenSponsor,
            }),
        });
        const result = await response.json()
        if (result.status == 'fail') {
            setError(result.error);
        } else {
            setError('');
            setAddToSponsorFlag(false);
            alert(`Added ${driver.username} to ${chosenSponsor}`);
        }
    };

    const dropSponsor = async () => {
        const response = await fetch(`https://team27.cpsc4911.com/sponsorships`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: driver.username,
                sponsor: usernameState,
                trueSponsor: "false"
            }),
        });
        handleGetPage();
    };

    const PointDialog = () => {
        return (
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
                <ManageAccounts user={driver.username} sponsor={driver.username} userType={driver?.acctType} />
                <Button onClick={closeDialog}>Close</Button>
            </Dialog>
        );
    };

    return (
        <Paper>
            <Container>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    {!isAdminUser && driver.acctType !== 'S' && <Box sx={{ width: '10%' }} align="center">
                        <PointChangeSelectionBox
                            selectedDrivers={selectedDrivers}
                            setSelectedDrivers={setSelectedDrivers}
                            driver={driver}
                        />
                    </Box>}
                    <Box sx={{ width: '20%' }}>
                        <Typography variant='h6'>{driver.fname + " " + driver.lname}</Typography>
                        <Typography>{"Username: " + driver.username}</Typography>
                        <Typography>{"Type: " + driver.acctType}</Typography>
                    </Box>
                    {isAdminUser && driver.acctType === 'S' && <Button variant="outlined" onClick={openDialog}>Manage Points</Button>}
                    {isAdminUser && driver.acctType === 'S' && <PointDialog />}
                    <Box sx={{ width: '10%' }}>
                        <ProfileEditButton user={driver} />
                    </Box>
                    {isAdminUser && driver.acctType === 'D' && AddToSponsorFlag && <AddToSponsor />}
                    {isAdminUser && driver.acctType === 'D' && !AddToSponsorFlag && <Button onClick={() => setAddToSponsorFlag(true)}>Add Driver To A Sponsor</Button>}
                    {!isAdminUser && driver.acctType !== 'S' &&
                        <Box sx={{ width: '10%' }}>
                            <PointDisplay refresh={refresh} driver={driver.username} user={user} />
                        </Box>}
                    {!isAdminUser && driver.acctType !== 'S' && <Box sx={{ width: '5%' }}>
                        <Button onClick={dropSponsor}>Drop</Button>
                    </Box>}
                </Stack>
            </Container>
        </Paper>


    );
};
