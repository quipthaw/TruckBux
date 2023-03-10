import React from 'react';
import { Paper, Container, Stack, Box, Typography, Button } from '@mui/material';
import { PointDisplay } from '../../ManagePoints/PointDisplay';
import { useRecoilState } from 'recoil';
import { userName, userType } from '../../../recoil_atoms';

export const MySponsorListRow = (props) => {
  const { sponsor, showPoints } = props;

  const [usernameState, setUsernameState] = useRecoilState(userName);
  const [sessionState, setSessionState] = useRecoilState(userType);

  const handleGetSponsors = () => {
    props.getSponsors();
  };
  const submitApp = async () => {
    const response = await fetch(`https://team27.cpsc4911.com/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: usernameState,
        sponsName: sponsor.sponsorName
      }),
    });
    handleGetSponsors();
  };
  const dropSponsor = async () => {
    const response = await fetch(`https://team27.cpsc4911.com/sponsorships`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: usernameState,
        sponsor: sponsor.sponsorName,
        trueSponsor: "true"
      }),
    });
    handleGetSponsors();
  };

  return (
    <Container>
      <Stack direction='row' justifyContent='space-between'>
        <Box>
          <Typography variant='h6' gutterBottom>{sponsor.sponsorName}</Typography>
          {sessionState !== '0' && <Typography>{"Conversion Rate: " + sponsor.pointConversionRate}</Typography>}
        </Box>
        <Stack flexDirection='row'>
          {showPoints && <PointDisplay driver={usernameState} user={sponsor.sponsorName} />}
          {showPoints && <Button onClick={dropSponsor}>Drop</Button>}
          {!showPoints && sessionState === 'D' && <Button onClick={submitApp}>Apply</Button>}
        </Stack>
      </Stack>
    </Container>
  )
};