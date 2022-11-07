import React from 'react';
import { Stack } from '@mui/material';
import { MySponsorListRow } from './MySponsorListRow';

export const MySponsorList = (props) => {
  const { sponsorList, showPoints } = props;

  const renderSponsorList = () => {
    return (
      sponsorList.map((sponsor) => {
        return <MySponsorListRow key={sponsor.sponsorName} sponsor={sponsor} showPoints={showPoints}/>;
      })
    );
  };

  return (
    <Stack direction="column" spacing={2}>
      {renderSponsorList()}
    </Stack>
  )
};

