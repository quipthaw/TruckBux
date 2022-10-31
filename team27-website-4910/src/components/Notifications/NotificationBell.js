import { IconButton, Popover } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useState, useEffect } from 'react';
import { NotificationList } from './NotificationList';

export const NotificationBell = (props) => {
  const [ notificationAnchor, setNotificationAnchor ] = useState(null);
  const { notifications, setUserNotifications } = props;
  const [ bellColor, setBellColor ] = useState("action");

  const nOpen = (e) => {
    if(notifications.length !== 0) {
      setNotificationAnchor(e.currentTarget);
    }
  };

  const nClose = () => {
    setNotificationAnchor(null);
  };

  //Close the notification menu if no more notifications
  useEffect(() => {
    if(notifications.length === 0) {
      setBellColor("action");
      nClose();
    }
    else {
      setBellColor("error");
    }

  }, [notifications])

  const open = Boolean(notificationAnchor);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={nOpen}>
        <NotificationsIcon color={bellColor}/>
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
        PaperProps={{
          style: { width: '15%' },
        }}
      >
        <NotificationList notifications={notifications} setUserNotifications={setUserNotifications}/>
      </Popover>
    </div>

  );
};