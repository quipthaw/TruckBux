import { CircularProgress,  Container,  Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { ManagePoints } from '../ManagePoints/ManagePoints';
import { useRecoilState } from 'recoil';
import { DriverApplicationsList } from './DriverApplicationsList';
import { UserList } from './UserList/UserList';

export default function ManageAccounts(props) {
    const { user, userType } = props;

    console.log(user);
    console.log(userType);
    //const [ usernameState, setUsernameState ] = useRecoilState(userName);
    //const [ sessionState, setSessionState ] = useRecoilState(userType);
    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();

    const [ refresh, setRefresh ] = React.useState(false);

    //List of drivers that PointChangeForm will send to backend
    const [selectedDrivers, setSelectedDrivers ] = React.useState([]);

    const getDrivers = async () => {
        const getRequestURL = `http://127.0.0.1:5000/sponsors?user=${user}`
        const response = await fetch(getRequestURL);

        const result = await response.json();

        if(userType === 'A') {
            const filteredAccounts = result.accounts.filter((account) => {
                return (account.acctType === 'S')
            })
            setDrivers(filteredAccounts);
        }
        else {
            setDrivers(result.accounts);
        }
        setLoading(false);
    };

    useEffect(() => {
        getDrivers()
    }, []);

    const selectAllDrivers = ()  => {
        if(drivers.length === selectedDrivers.length) {
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
                    {userType === 'S' && <DriverApplicationsList/>}

                    {userType === 'S' && <Typography variant='h3' gutterBottom>Point Change</Typography>}
                    {userType === 'S' && <ManagePoints user={user} drivers={drivers} selectedDrivers={selectedDrivers} refresh={refresh} setRefresh={setRefresh}/>}

                    <Typography variant='h3' gutterBottom>My Drivers</Typography>
                    <UserList
                        user={user}
                        userType={userType}
                        selectAllDrivers={selectAllDrivers}
                        selectedDrivers={selectedDrivers}
                        setSelectedDrivers={setSelectedDrivers}
                        refresh={refresh} 
                        setRefresh={setRefresh} 
                        userList={drivers}
                    />
                </Stack>
            }
        </Container>
    )
}