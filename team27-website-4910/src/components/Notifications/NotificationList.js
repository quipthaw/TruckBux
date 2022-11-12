import { Stack } from '@mui/material';
import React from 'react';
import { NotificationCard } from './NotificationCard';

export const NotificationList = (props) => {
  const { notifications, setUserNotifications } = props;

  const PopulateNotificationList = () => {
  
    const userNotifications = notifications.map((notification) => {
      const cardColor = (notifications.indexOf(notification) % 2) === 0 ? '' : 'grey';

      return(
          <NotificationCard 
            key={notification.date} 
            notification={notification} 
            setUserNotifications={setUserNotifications}
            cardColor={cardColor}
          />
      );
    });

    return userNotifications;
  };

  return (
    <Stack direction="column" spacing={.5}>
      <PopulateNotificationList/>
    </Stack>
  )
};