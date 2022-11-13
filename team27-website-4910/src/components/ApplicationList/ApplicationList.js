import React from 'react';
import { Paper, Stack } from '@mui/material';
import { ApplicationListRow } from './ApplicationListRow';

export const ApplicationList = (props) => {
    const { appList, getApps } = props;

    const renderAppList = () => {
        return (
            appList.map((app) => {
                return <ApplicationListRow getApps={getApps} key={app.applicationID} app={app} />;
            })
        );
    };

    return (
        <Paper>
            <Stack direction="column" spacing={2}>
                {renderAppList()}
            </Stack>
        </Paper>
    )

};