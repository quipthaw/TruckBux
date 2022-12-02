import { CircularProgress, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { ManagePoints } from '../ManagePoints/ManagePoints';
import { ApplicationList } from '../ApplicationList/ApplicationList';
import { UserList } from './UserList/UserList';

export default function ManageAccounts(props) {
    const { user, sponsor, userType } = props;

    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();
    const [sponsors, setSponsors] = React.useState(); //this is a list of the sponsor accounts
    const [orgs, setOrgs] = React.useState([]); //this is a list of the actual sponsors like the organization over the sponsor accounts
    const [admins, setAdmins] = React.useState();

    const [applications, setApplications] = React.useState();

    const [refresh, setRefresh] = React.useState(false);

    const [selectedDrivers, setSelectedDrivers] = React.useState([]);

    const getDrivers = async () => {
        const getRequestURL = `http://127.0.0.1:5000/users?user=${user}`
        const response = await fetch(getRequestURL);

        const result = await response.json();

        setAdmins(result.admins);
        setSponsors(result.sponsors);
        setDrivers(result.drivers);
    };

    const getOrgs = async () => {
        if (userType == 'A') {
            const response = await fetch('http://127.0.0.1:5000/sponsors');
            const result = await response.json();
            setOrgs(result.otherSponsors);
        }
    };

    const getApps = async () => {
        const getRequestURL = `http://127.0.0.1:5000/applications?user=${user}`
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

                    {userType === 'A' && <Typography variant='h3' gutterBottom>Sponsor Accounts</Typography>}
                    {userType === 'A' &&
                        <UserList
                            user={sponsor}
                            userType={userType}
                            selectAllDrivers={selectAllDrivers}
                            selectedDrivers={selectedDrivers}
                            setSelectedDrivers={setSelectedDrivers}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            userList={sponsors}
                        />
                    }

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
                        />
                    }
                </Stack>
            }
        </Container>
    )
}