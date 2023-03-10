import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const PointDisplay = (props) => {
  const { driver, refresh, user } = props;
  const [points, setPoints] = useState(0);

  const [loading, setLoading] = useState(true);

  const getPoints = async () => {
    setLoading(true);
    const getRequestURL = `https://team27.cpsc4911.com/points?driver=${driver}`;
    const response = await fetch(getRequestURL);
    const result = await response.json();

    const sponsorResult = result.find((sponsor) => sponsor.sponsorName === user)
    if (sponsorResult !== undefined) {
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
    if (loading) {
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