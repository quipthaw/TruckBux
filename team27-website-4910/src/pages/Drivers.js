import { CircularProgress,  Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { DriverApplicationsList } from '../components/ManageAccount/DriverApplicationsList';
import { UserList } from '../components/ManageAccount/UserList/UserList';
import { ManagePoints } from '../components/ManagePoints/ManagePoints';

export default function Drivers() {
    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();

    const [ refresh, setRefresh ] = React.useState(false);

    //List of drivers that PointChangeForm will send to backend
    const [selectedDrivers, setSelectedDrivers ] = React.useState([]);

    const getDrivers = async () => {
        const getRequestURL = `http://127.0.0.1:5000/sponsors?sponsName=${"Adidas"}`
        const response = await fetch(getRequestURL);

        const result = await response.json();
        setDrivers(result.accounts);
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
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack direction="column" spacing={2}>       
                    <Typography variant='h3' gutterBottom>Applications</Typography>
                    <DriverApplicationsList/>

                    <Typography variant='h3' gutterBottom>Point Change</Typography>
                    <ManagePoints drivers={drivers} selectedDrivers={selectedDrivers} refresh={refresh} setRefresh={setRefresh}/>

                    <Typography variant='h3' gutterBottom>My Drivers</Typography>
                    <UserList 
                        selectAllDrivers={selectAllDrivers}
                        selectedDrivers={selectedDrivers}
                        setSelectedDrivers={setSelectedDrivers}
                        refresh={refresh} 
                        setRefresh={setRefresh} 
                        userList={drivers}
                    />
                </Stack>
            }
        </Layout>
    )
}