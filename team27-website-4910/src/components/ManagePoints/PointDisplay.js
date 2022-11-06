import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userName } from '../../recoil_atoms';

export const PointDisplay = (props) => {
  const { driver, refresh, user } = props;
  const [ usernameState, setUsernameState ] = useRecoilState(userName);
  const [ points, setPoints ] = useState(0);
  
  const getPoints = async () => {
    const getRequestURL = `http://127.0.0.1:5000/points?driver=${driver.username}`;
    const response = await fetch(getRequestURL);
    const result = await response.json();

    const sponsorResult = result.find((sponsor) => sponsor.sponsorName === user)
    setPoints(Number(sponsorResult.points));
  };

  useEffect(() => {
    getPoints();
  }, [refresh])

  return (
    <Stack direction="column" spacing={2} align="center">
      <Typography>Points</Typography>
      <Typography>{points}</Typography>
    </Stack>
  );
}