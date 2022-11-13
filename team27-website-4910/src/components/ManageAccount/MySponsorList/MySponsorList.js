import React from 'react';
import { Paper, Stack } from '@mui/material';
import { MySponsorListRow } from './MySponsorListRow';

export const MySponsorList = (props) => {
  const { sponsorList, showPoints, getSponsors } = props;

  const renderSponsorList = () => {
    return (
      sponsorList.map((sponsor) => {
        return <MySponsorListRow getSponsors={getSponsors} key={sponsor.sponsorName} sponsor={sponsor} showPoints={showPoints} />;
      })
    );
  };

  return (
    <Paper>
      <Stack direction="column" spacing={2}>
        {renderSponsorList()}
      </Stack>
    </Paper>
  )

};

