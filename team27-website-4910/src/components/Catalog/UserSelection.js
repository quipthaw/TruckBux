import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userType } from '../../recoil_atoms';

export const UserSelection = (props) => {
  const { user, requestedType, selection, setSelection } = props;
  const [ sessionState, setSessionState ] = useRecoilState(userType);

  const [ userList, setUserList ] = useState(['temp', 'nottemp']);

  useEffect(() => {
    getUserList();
  }, [])

  const getUserList = () => {
    if(requestedType === 'S') {
      getSponsorList()
    }
    else {
      getDriverList();
    }
  }

  const getDriverList = async () => {
    const path = 'http://127.0.0.1:5000/users';
    
    const fetchURL = `${path}?user=${user}`;

    const response = await fetch(fetchURL);
    const result = await response.json();
    console.log(result);

    const newUserList = result.drivers.map((driver) => {
      return driver.username;
    })

    console.log(newUserList);
    setUserList(newUserList);
    setSelection(newUserList[0]);
  }

  const getSponsorList = async () => {
    const path = 'http://127.0.0.1:5000/sponsors';

    const fetchURL = `${path}?user=${user}`;

    const response = await fetch(fetchURL);
    const result = await response.json();

    let newUserList = [];

    if(sessionState === 'A') {
      newUserList = result.otherSponsors.map((sponsor) => {
        return sponsor.sponsorName;
      })
    }
    else {
      newUserList = result.relatedSponsors.map((sponsor) => {
        return sponsor.sponsorName;
      })
    }
    setUserList(newUserList);
    setSelection(newUserList[0]);
  };

  const getUserListMenuItems = () => {
    const users = userList.map((user) => {
      return <MenuItem key={user} value={user}>{user}</MenuItem>
    });

    return users;
  };

  const handleSelection = (e) => {
    setSelection(e.target.value);
  }

  return (
    <TextField
      
      select
      id="catalogSponsor"
      label={requestedType === 'S' ? "Sponsor" : "Driver"}
      InputLabelProps={{ shrink: true }}
      value={selection}
      onChange={handleSelection}
    >
      {getUserListMenuItems()}
    </TextField>
  );
}