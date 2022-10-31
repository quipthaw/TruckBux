import { IconButton, Popover } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useState } from 'react';
import { NotificationList } from './NotificationList';

export const NotificationBell = (props) => {
  const [ notificationAnchor, setNotificationAnchor ] = useState(null);
  const { notifications } = props;

  const nOpen = (e) => {
    setNotificationAnchor(e.currentTarget);
  };

  const nClose = () => {
    setNotificationAnchor(null);
  };

  const open = Boolean(notificationAnchor);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={nOpen}>
        <NotificationsIcon color="action"/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={notificationAnchor}
        onClose={nClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <NotificationList notifications={notifications}/>
      </Popover>
    </div>

  );
};