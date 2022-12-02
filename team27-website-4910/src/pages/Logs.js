import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Layout from '../components/Layout/Layout';
import LogTable from '../components/LogTable/LogTable';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../recoil_atoms';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ReportSelector from '../components/ReportDownloader/ReportSelector';

export default function Logs() {
    const [users, setUsers] = React.useState([]);
    const [logs, setLogs] = React.useState([]);
    const [logTypes, setLogTypes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [usernameState, setUsernameState] = useRecoilState(userName);
    const [sessionState, setSessionState] = useRecoilState(userType);

    const [userFilter, setUserFilter] = React.useState('');

    const handleUFChange = (event) => {
        setUserFilter(event.target.value);
    };

    const [typeFilter, setTypeFilter] = React.useState('');

    const handleTFChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const [startTime, setStartTime] = React.useState(moment('2022-08-01').format('YYYY-MM-DD'));
    const [endTime, setEndTime] = React.useState(moment().format('YYYY-MM-DD'));

    const handleSTChange = (newValue) => {
        setStartTime(moment(newValue).format('YYYY-MM-DD'));
    };
    const handleETChange = (newValue) => {
        setEndTime(moment(newValue).format('YYYY-MM-DD'));
    };

    const getUsers = async () => {
        const responseURL = `http://127.0.0.1:5000/users?user=${usernameState}`
        const response = await fetch(responseURL);
        const result = await response.json();

        setUsers(result.drivers.concat(result.sponsors.concat(result.admins)));
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionState === '0') { navigate('/'); }
        getUsers();
        getLogTypes();
        getLogs();
        setLoading(false);
    }, []);

    const getLogs = async () => {
        const responseURL = `http://127.0.0.1:5000/logs?user=${usernameState}&start_date=${startTime}&end_date=${endTime}&username=${userFilter}&log_type=${typeFilter}`;

        const response = await fetch(responseURL);
        const result = await response.json();

        setLogs(result.logs);
    }

    const getLogTypes = async () => {
        const responseURL = `http://127.0.0.1:5000/logs/types`;

        const response = await fetch(responseURL);
        const result = await response.json();

        setLogTypes(result.types);
    }

    useEffect(() => {
        getLogs();
    }, [userFilter, typeFilter, startTime, endTime]);

    const downloadCSV = logs => {

        let csv = [Object.keys(logs[0]).slice(0).join(",")];
        logs.forEach(
            item => csv.push(
                Object.values(item).map(val => val.split(",").length > 1 ? val.split(",")[1] : val).join(",")
            )
        )
        csv = csv.join("\n");
        console.log(csv);
        var link = document.createElement('a');
        link.href = "data:text/csv;charset=utf-8," + escape(csv);
        link.download = `logs_${userFilter}_${typeFilter}_${startTime}_${endTime}.csv`;
        link.click();
    };


    return (

        <Layout>
            {loading ? <CircularProgress /> : (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Paper sx={{
                        'margin-top': '5vh',
                    }}>
                        <Stack alignItems='center'>
                            <Stack flexDirection='row' sx={{ my: 5 }}>
                                {sessionState !== 'D' &&
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
                                                    <MenuItem key={user.username} value={user.username}>{user.username}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>Logs for this user</FormHelperText>
                                    </FormControl>
                                }
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Log Type</InputLabel>
                                    <Select
                                        value={typeFilter}
                                        label='Log Type'
                                        onChange={handleTFChange}
                                    >
                                        <MenuItem value=''>-- All --</MenuItem>
                                        {logTypes.map((logType) => {
                                            return (
                                                <MenuItem key={logType} value={logType}>{logType}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>What type of logs</FormHelperText>
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
                                <Button onClick={() => { downloadCSV(logs) }}>Download Logs</Button>
                            </Box>
                            {sessionState == 'A' &&
                                <Stack my={5} spacing={2} width='75%'>
                                    <Typography variant='h5'>Generate Reports:</Typography>
                                    <ReportSelector />
                                </Stack>}
                        </Stack>
                    </Paper>
                </LocalizationProvider>)}
        </Layout>
    )
}
