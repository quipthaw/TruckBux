import { Card, Grid } from '@mui/material';
import React from 'react';
import { NotificationCard } from './NotificationCard';

export const NotificationList = (props) => {
  const { notifications } = props;

  const PopulateNotificationList = () => {
    console.log(notifications);
    if(notifications === undefined) {
      return (
        <Grid item>
          <Card/>
        </Grid>
      )
    }
  
    const userNotifications = notifications.map((notification) => {
      return(
        <Grid item>
          <NotificationCard key={notification.message} notification={notification}/>
        </Grid>
      );
    });

    return userNotifications;
  };

  return (
    <Grid container>
      <PopulateNotificationList/>
    </Grid>
  )
};