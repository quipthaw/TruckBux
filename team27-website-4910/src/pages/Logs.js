import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import Layout from '../components/Layout/Layout';
import LogTable from '../components/LogTable/LogTable';

export default function Logs() {
    return (
        <Layout>
            <Paper sx={{
                'margin-top': '5vh',
            }}>
                <Stack alignItems='center'>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>User</InputLabel>
                            <Select
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Logs for this user</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Sponsor</InputLabel>
                            <Select
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Logs for this sponsor</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Start Date</InputLabel>
                            <Select
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Start date of logs</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>End Date</InputLabel>
                            <Select
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>End date of logs</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box>
                        <LogTable />
                    </Box>
                </Stack>
            </Paper>
        </Layout>
    )
}
