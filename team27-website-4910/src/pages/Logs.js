import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Layout from '../components/Layout/Layout';
import LogTable from '../components/LogTable/LogTable';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function Logs() {
    const [users, setUsers] = React.useState([]);
    const [logs, setLogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sessionState, setSessionState] = useRecoilState(userType);

    const [userFilter, setUserFilter] = React.useState('');

    const handleUFChange = (event) => {
        setUserFilter(event.target.value);
    }

    const [startTime, setStartTime] = React.useState(moment().format('YYYY-MM-DD'));
    const [endTime, setEndTime] = React.useState(moment().format('YYYY-MM-DD'));

    const handleSTChange = (newValue) => {
        setStartTime(moment(newValue).format('YYYY-MM-DD'));
    };
    const handleETChange = (newValue) => {
        setEndTime(moment(newValue).format('YYYY-MM-DD'));
    };

    const getUsers = async () => {
        const responseURL = `http://127.0.0.1:5000/drivers?user=${usernameState}`
        const response = await fetch(responseURL);
        const result = await response.json();

        setUsers(result.drivers);
        setLoading(false);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionState === '0') { navigate('/'); }
        getUsers();
    }, []);

    const getLogs = async () => {
        setLoading(true);
        const responseURL = `http://127.0.0.1:5000/logs?start_date=${startTime}&end_date=${endTime}&username=${userFilter}`

        const response = await fetch(responseURL);
        const result = await response.json();

        setLogs(result.logs);
        setLoading(false);
    }

    useEffect(() => {
        getLogs();
    }, [userFilter, startTime, endTime]);


    return (

        <Layout>
            {loading ? <CircularProgress /> : (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Paper sx={{
                        'margin-top': '5vh',
                    }}>
                        <Stack alignItems='center'>
                            <Stack flexDirection='row' sx={{ my: 5 }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>User</InputLabel>
                                    <Select
                                        value={userFilter}
                                        label='User'
                                        onChange={handleUFChange}
                                    >
                                        <MenuItem value=''>-- All --</MenuItem>
                                        {users.map((user) => {
                                            return (
                                                <MenuItem value={user.username}>{user.username}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>Logs for this user</FormHelperText>
                                </FormControl>
                                <Box sx={{ m: 1 }}>
                                    <MobileDatePicker
                                        label="Start Date"
                                        inputFormat="YYYY-MM-DD"
                                        value={startTime}
                                        onChange={handleSTChange}
                                        renderInput={(params) => <TextField {...params} helperText='Start in format YYYY-MM-DD' />}
                                    />
                                </Box>
                                <Box sx={{ m: 1 }}>
                                    <MobileDatePicker
                                        label="End Date"
                                        inputFormat="YYYY-MM-DD"
                                        value={endTime}
                                        onChange={handleETChange}
                                        renderInput={(params) => <TextField {...params} helperText='End in format YYYY-MM-DD' />}
                                    />
                                </Box>
                            </Stack>
                            <Box>
                                <LogTable logs={logs} />
                            </Box>
                        </Stack>
                    </Paper>
                </LocalizationProvider>)}
        </Layout>
    )
}
