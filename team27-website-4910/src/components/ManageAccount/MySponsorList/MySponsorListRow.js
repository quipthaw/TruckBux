import React from 'react';
import { Paper, Container, Stack, Box, Typography, Button } from '@mui/material';
import { PointDisplay } from '../../ManagePoints/PointDisplay';
import { useRecoilState } from 'recoil';
import { userName } from '../../../recoil_atoms';

export const MySponsorListRow = (props) => {
  const { sponsor, showPoints } = props;

  const [ usernameState, setUsernameState ] = useRecoilState(userName);

  const driver = {'username': usernameState};

  return (
    <Paper>
      <Container>
          <Stack direction='row' justifyContent='space-between'>
               
                <Box>
                  <Typography variant='h6' gutterBottom>{sponsor.sponsorName}</Typography>
                  <Typography>{"ID: " + sponsor.sponsorID}</Typography>
                  <Typography>{"Conversion Rate: " + sponsor.pointConversionRate}</Typography>
                </Box>
              
              {!showPoints && <Button>Apply</Button>}
              <Box>
                {showPoints && <PointDisplay driver={driver} user={sponsor.sponsorName}/>}
              </Box>
          </Stack>
      </Container>
    </Paper>
  )
};