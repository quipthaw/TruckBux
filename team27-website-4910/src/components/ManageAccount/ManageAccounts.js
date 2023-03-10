import { CircularProgress, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { ManagePoints } from '../ManagePoints/ManagePoints';
import { ApplicationList } from '../ApplicationList/ApplicationList';
import { UserList } from './UserList/UserList';

export default function ManageAccounts(props) {
    const { user, sponsor, userType } = props;

    console.log(user, sponsor, userType);

    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();
    const [sponsors, setSponsors] = React.useState(); //this is a list of the sponsor accounts
    const [orgs, setOrgs] = React.useState([]); //this is a list of the actual sponsors like the organization over the sponsor accounts
    const [admins, setAdmins] = React.useState();

    const [applications, setApplications] = React.useState();

    const [refresh, setRefresh] = React.useState(false);

    const [selectedDrivers, setSelectedDrivers] = React.useState([]);

    const getDrivers = async () => {
        const getRequestURL = `https://team27.cpsc4911.com/users?user=${user}`
        const response = await fetch(getRequestURL);

        const result = await response.json();

        setAdmins(result.admins);
        setSponsors(result.sponsors);
        setDrivers(result.drivers);
    };

    const getOrgs = async () => {
        if (userType == 'A') {
            const response = await fetch('https://team27.cpsc4911.com/sponsors');
            const result = await response.json();
            setOrgs(result.otherSponsors);
        }
    };

    const getApps = async () => {
        const getRequestURL = `https://team27.cpsc4911.com/applications?user=${user}`
        const response = await fetch(getRequestURL);

        const result = await response.json();

        setApplications(result.apps);
    };

    const getPageInfo = async () => {
        await getApps();
        await getDrivers();
        await getOrgs();
        setLoading(false);
    };

    useEffect(() => {
        getPageInfo()
    }, []);

    const selectAllDrivers = () => {
        if (drivers.length === selectedDrivers.length) {
            setSelectedDrivers([]);
        }
        else {
            setSelectedDrivers([...drivers]);
        }
    }

    return (
        <Container>
            {loading ?
                <CircularProgress />
                :
                <Stack direction="column" spacing={2}>
                    {userType === 'S' && <Typography variant='h3' gutterBottom>Applications</Typography>}
                    {userType === 'S' && <ApplicationList appList={applications} getApps={getPageInfo} />}

                    {userType === 'S' && <Typography variant='h3' gutterBottom>Point Change</Typography>}
                    {userType === 'S' && <ManagePoints user={user} drivers={drivers} selectedDrivers={selectedDrivers} refresh={refresh} setRefresh={setRefresh} />}

                    <Typography variant='h3' gutterBottom>Sponsor Accounts</Typography>
                    <UserList
                        user={sponsor}
                        userType={userType}
                        selectAllDrivers={selectAllDrivers}
                        selectedDrivers={selectedDrivers}
                        setSelectedDrivers={setSelectedDrivers}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        userList={sponsors}
                        getPage={getPageInfo}
                        isSponsor
                    />

                    {userType === 'S' && <Typography variant='h3' gutterBottom>My Drivers</Typography>}
                    {userType === 'A' && <Typography variant='h3' gutterBottom>Driver Accounts</Typography>}
                    <UserList
                        user={sponsor}
                        userType={userType}
                        selectAllDrivers={selectAllDrivers}
                        selectedDrivers={selectedDrivers}
                        setSelectedDrivers={setSelectedDrivers}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        userList={drivers}
                        orgList={orgs}
                        getPage={getPageInfo}
                    />

                    {userType === 'A' && <Typography variant='h3' gutterBottom>Admin Accounts</Typography>}
                    {userType === 'A' &&
                        <UserList
                            user={sponsor}
                            userType={userType}
                            selectAllDrivers={selectAllDrivers}
                            selectedDrivers={selectedDrivers}
                            setSelectedDrivers={setSelectedDrivers}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            userList={admins}
                            getPage={getPageInfo}
                        />
                    }
                </Stack>
            }
        </Container>
    )
}