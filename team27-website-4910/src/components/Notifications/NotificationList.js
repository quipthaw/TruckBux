import { Card, Stack } from '@mui/material';
import React from 'react';
import { NotificationCard } from './NotificationCard';

export const NotificationList = (props) => {
  const { notifications, setUserNotifications } = props;

  const PopulateNotificationList = () => {
  
    const userNotifications = notifications.map((notification) => {
      const cardColor = (notifications.indexOf(notification) % 2) === 0 ? '' : 'grey';

      return(
          <NotificationCard 
            key={notification.message} 
            notification={notification} 
            setUserNotifications={setUserNotifications}
            cardColor={cardColor}
          />
      );
    });

    return userNotifications;
  };

  return (
    <Stack direction="column">
      <PopulateNotificationList/>
    </Stack>
  )
};