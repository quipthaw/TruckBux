import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';

export const NotificationCard = (props) => {
  const { notification } = props;

  const messageSeen = () => {
    console.log("Saw it!");
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={messageSeen}>
        <CardContent>
          <Typography>{notification.message}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};