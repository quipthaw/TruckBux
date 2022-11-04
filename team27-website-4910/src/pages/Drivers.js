import { CircularProgress, Paper, Typography, Box, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { DriverApplicationsList } from '../components/ManageAccount/DriverApplicationsList';
import { DriversUserRow } from '../components/ManageAccount/UserList/UserListRow';
import { UserList } from '../components/ManageAccount/UserList/UserList';
import { ManagePoints } from '../components/ManagePoints/ManagePoints';

export default function Register() {
    const [loading, setLoading] = React.useState(true);

    const [drivers, setDrivers] = React.useState();

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

    console.log(drivers);

    const UserSelectionCheckbox = (props) => {
        const { driver, setSelectedDrivers } = props;
        const [ isSelected, setIsSelected ] = React.useState(false);

        const handleSelection = (e) => {
            setIsSelected(e.target.checked);

            setSelectedDrivers((prevSelectedDrivers) => {
                const newSelectedDrivers = [...prevSelectedDrivers];
            
                if(e.target.checked) {
                    const selectedDriver = {
                    ...driver,
                    'selected': e.target.checked,
                    }

                    newSelectedDrivers.push(selectedDriver);
                }
                else {
                    const deleteIndex = newSelectedDrivers.indexOf(driver);
                    if(deleteIndex > -1) {
                        newSelectedDrivers.splice(deleteIndex, 1);
                    }
                }

                return newSelectedDrivers;
            });
        };

        return (
            <FormGroup  sx={{ width: '5%'}}>
                <FormControlLabel
                    control={<Checkbox checked={isSelected} onChange={handleSelection}/>}
                />
            </FormGroup>
        );
    };

    return (
        <Layout>
            {loading ?
                <CircularProgress />
                :
                <Stack direction="column" spacing={2}>       
                    <Typography variant='h3' gutterBottom>Applications</Typography>
                    <DriverApplicationsList/>

                    <Typography variant='h3' gutterBottom>Point Change</Typography>
                    <ManagePoints/>

                    <Typography variant='h3' gutterBottom>My Drivers</Typography>
                    <UserList userList={drivers}/>
                </Stack>
            }
        </Layout>
    )
}