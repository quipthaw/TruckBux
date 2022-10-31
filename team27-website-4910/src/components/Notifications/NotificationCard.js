import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

export const NotificationCard = (props) => {
  const { notification, setUserNotifications, cardColor } = props;

  const messageSeen = () => {
    setUserNotifications((prevUserNotifications) => {
      const newNotifications = [...prevUserNotifications];
      const deleteIndex = newNotifications.indexOf(notification);

      if(deleteIndex > -1) {
        newNotifications.splice(deleteIndex, 1);
      }

      return newNotifications;
    });
  };

  return (
    <Card variant="outlined" sx={{ 'background-color': cardColor, width: '100%'}}>
      <CardActionArea onClick={messageSeen}>
        <Stack direction="row">
          <CardContent sx={{ position: 'relative', right: '0%'}}>
            <CheckIcon/>
          </CardContent>
          <CardContent sx={{ position: 'relative', left: '0%'}}>
              <Typography fontSize={12} align="right">{notification.message}</Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
};