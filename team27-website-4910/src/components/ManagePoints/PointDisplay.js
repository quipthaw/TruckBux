import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const PointDisplay = (props) => {
  const { driver, refresh, user } = props;
  const [ points, setPoints ] = useState(0);

  const [ loading, setLoading ] = useState(true);
  
  const getPoints = async () => {
    setLoading(true);
    const getRequestURL = `http://127.0.0.1:5000/points?driver=${driver.username}`;
    const response = await fetch(getRequestURL);
    const result = await response.json();
    console.log(result)

    const sponsorResult = result.find((sponsor) => sponsor.sponsorName === user)
    console.log(sponsorResult)
    if(sponsorResult !== undefined) {
      setPoints(Number(sponsorResult.points));
    }
    else {
      setPoints(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPoints();
  }, [refresh])

  const Display = () => {
    if(loading) {
      return <CircularProgress />;
    }
    else {
      return (
        <Stack direction="column" spacing={2} align="center">
          <Typography>Points</Typography>
          <Typography>{points}</Typography>
        </Stack>
      )
    }
  };

  return (
    <Display />
  );
}